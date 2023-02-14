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

async function createUser(email, name, password) {
  const response = await fetch(`${process.env.FIREBASE_URL}/users.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: `${+new Date()}`, email, name, password }),
  });
  const data = await response.json();

  return data;
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

  const newUser = await createUser(email, name, hashedPassword);

  res.status(201).json({
    message: "Selamat datang. Silakan login untuk masuk!",
    userKey: newUser.name,
  });
}
