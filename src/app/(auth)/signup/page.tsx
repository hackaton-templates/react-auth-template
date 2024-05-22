import SignUpForm from "@/components/auth/sign-up-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col">
      <SignUpForm />
      <Button className="pt-6 h-6 opacity-75" variant="link" asChild>
        <Link href="/signin">Уже есть аккаунт?</Link>
      </Button>
    </div>
  );
}
