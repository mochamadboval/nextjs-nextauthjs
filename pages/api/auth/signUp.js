import crypto from "crypto";
import nodemailer from "nodemailer";
import { hash } from "bcryptjs";

import { isUserExists } from "@/helpers/fetchFirebase";

function checkInvalidInput(email, name, password) {
  if (!name) {
    return "Nama tidak boleh kosong!";
  }
  if (!email || !email.includes("@")) {
    return "Email tidak boleh kosong dan harus memiliki simbol @ !";
  }
  if (!password || password.length < 6) {
    return "Kata sandi harus minimal 6 karakter!";
  }
}

async function createUser(email, name, password, verifyEmailToken) {
  const response = await fetch(`${process.env.FIREBASE_URL}/users.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: `${+new Date()}`,
      email,
      name,
      password,
      verified: false,
      verifyEmailToken,
    }),
  });
  const data = await response.json();

  return data;
}

function sendEmailVerification(email, name, verifyEmailToken) {
  const transporter = nodemailer.createTransport({
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
  });

  const mailMessage = `
    <p>Hai, ${name}.</p>
    <p>
      Aktivasi akun pada tautan berikut:
      <a href="https://mb-nextjs-nextauthjs.vercel.app/activation?token=${verifyEmailToken}" target="_blank">
        https://mb-nextjs-nextauthjs.vercel.app/activation?token=${verifyEmailToken}
      </a>
    </p>`;

  transporter.sendMail({
    from: process.env.ZOHO_USER,
    to: email,
    subject: "Aktivasi akun Next.js x NextAuth.js",
    html: mailMessage,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const email = req.body.email.trim();
  const name = req.body.name.trim();
  const password = req.body.password;

  const invalidMessage = checkInvalidInput(email, name, password);
  if (invalidMessage) {
    res.status(422).json({ message: invalidMessage });
    return;
  }

  const user = await isUserExists(email);
  if (Object.keys(user).length !== 0) {
    res.status(422).json({ message: "Email sudah terdaftar!" });
    return;
  }

  const hashedPassword = await hash(password, 12);
  const verifyEmailToken = crypto.randomUUID();

  const newUser = await createUser(
    email,
    name,
    hashedPassword,
    verifyEmailToken
  );

  sendEmailVerification(email, name, verifyEmailToken);

  res.status(201).json({
    message: "Pendaftaran berhasil. Cek email untuk aktivasi akun!",
    userKey: newUser.name,
  });
}
