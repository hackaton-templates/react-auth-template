"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpDto } from "@/lib/dto/sign-up.dto";
import signUpForm from "@/lib/forms/sign-up.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useRepository from "@/hooks/repository";
import authService from "@/services/auth.service";
import authStorageService from "@/services/auth-storage.service";
import userStorageService from "@/services/user-storage.service";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirm: "",
    },
  });
  const { api } = useRepository();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignUpDto> = async (data) => {
    try {
      const newUser = (await api.users.create(data)).data;

      const authResult = await authService.signIn(data);
      authStorageService.set(authResult);

      const user = await authService.getMe(authResult);
      userStorageService.set(user);

      toast({
        title: "Добро пожаловать!",
        description: `Мы рады тебя видеть, ${user.name}!`,
      });
      router.push("/");
    } catch (e) {
      // @ts-ignore
      if (e.response?.status == 409) {
        form.setError("email", { message: "Email уже используется!" });
        return;
      }

      console.error(e);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "При регистрации произошла неизвестная ошибка",
      });
    }
  };

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Добро пожаловать! Пожалуйста, представьтесь!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          autoComplete="off"
          id="register_form"
        >
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Электронная почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="StarPanda"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="●●●●●●●●"
                      type="password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="●●●●●●●●"
                      type="password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
            >
              Регистрация
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
