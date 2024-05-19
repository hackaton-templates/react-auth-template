import { z } from "zod";

export default z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});
