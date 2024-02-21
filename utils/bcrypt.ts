import bcrypt from "bcrypt";
export async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
}
