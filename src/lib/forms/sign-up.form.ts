import { z } from "zod";

export default z
  .object({
    username: z.string().min(4),
    password: z.string().min(6),
    confirm: z.string().min(6),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли не совпадают!",
    path: ["confirm"],
  });
