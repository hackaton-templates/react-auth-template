import { z } from "zod";
import signUpForm from "../forms/sign-up.form";

export type SignUpDto = z.infer<typeof signUpForm>;
