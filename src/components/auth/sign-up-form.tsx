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

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<SignUpDto> = async (data) => {};

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
