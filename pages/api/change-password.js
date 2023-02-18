import { compare, hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const { newPassword, oldPassword, userKey, userPassword } = req.body;

  const isOldPasswordValid = await compare(oldPassword, userPassword);
  if (!isOldPasswordValid) {
    res.status(422).json({ message: "Kata sandi lama salah!" });
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    res
      .status(422)
      .json({ message: "Kata sandi baru harus minimal 6 karakter!" });
    return;
  }

  const hashedNewPassword = await hash(newPassword, 12);

  await fetch(`${process.env.FIREBASE_URL}/users/${userKey}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: hashedNewPassword }),
  });

  res.status(201).json({
    message: "Kata sandi berhasil diubah.",
  });
}
