export async function isUserExists(email) {
  const response = await fetch(
    `${process.env.FIREBASE_URL}/users.json?orderBy="email"&equalTo="${email}"`
  );
  const data = await response.json();

  return data;
}
