export default interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  age: number;
  gender: "Laki Laki" | "Perempuan";
  created_at: string;
  updated_at: string;
}
