"use client";

import * as Alert from "@/components/ui/alert-dialog";
import SignInForm from "@/components/auth/sign-in-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [alertOpened, setAlertOpened] = useState(false);

  return (
    <div className="flex flex-col">
      <SignInForm />
      <Button
        className="pt-6 h-6 opacity-75"
        variant="link"
        onClick={(e) => setAlertOpened(true)}
      >
        Забыли пароль?
      </Button>
      <Button className="h-6 opacity-75" variant="link" asChild>
        <Link href="/signup">Регистрация</Link>
      </Button>

      <Alert.AlertDialog open={alertOpened} onOpenChange={setAlertOpened}>
        <Alert.AlertDialogContent>
          <Alert.AlertDialogHeader>
            <Alert.AlertDialogTitle className="text-lg font-semibold">
              Забыли пароль?
            </Alert.AlertDialogTitle>
            <Alert.AlertDialogDescription>
              Пожалуйста, обратитесь к техническому отделу для восстановления
              доступа.
            </Alert.AlertDialogDescription>
          </Alert.AlertDialogHeader>
          <Alert.AlertDialogFooter>
            <Alert.AlertDialogCancel>Закрыть</Alert.AlertDialogCancel>
          </Alert.AlertDialogFooter>
        </Alert.AlertDialogContent>
      </Alert.AlertDialog>
    </div>
  );
}
