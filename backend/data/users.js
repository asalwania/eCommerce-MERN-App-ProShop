import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ajay",
    email: "ajay@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Alka",
    email: "alka@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
