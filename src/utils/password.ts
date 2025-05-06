import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
