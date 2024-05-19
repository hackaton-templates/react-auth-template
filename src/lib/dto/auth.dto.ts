import { z } from "zod";
import signInForm from "../forms/sign-in.form";

export type SignInDto = z.infer<typeof signInForm>;
