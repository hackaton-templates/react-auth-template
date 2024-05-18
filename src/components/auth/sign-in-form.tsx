"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInDto } from "@/lib/dto/auth.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import signInForm from "@/lib/forms/sign-in.form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import authService from "@/services/auth.service";
import authStorageService from "@/services/auth-storage.service";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<SignInDto> = async (data) => {
    try {
      const authResult = await authService.signIn(data);
      authStorageService.set(authResult);
      toast({
        title: "Вход выполнен",
        description: `Добро пожаловать, ${data.username}!`,
      });
      router.push("/");
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Неправильный логин/пароль",
      });
    }
  };

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>Пожалуйста, войдите в систему.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
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
                    <Input placeholder="●●●●●●●●" type="password" {...field} />
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
              Вход
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
