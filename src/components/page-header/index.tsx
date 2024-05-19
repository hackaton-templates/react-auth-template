"use client";

import { usePathname } from "next/navigation";
import NavigationMenu, { type NavigationLink } from "./navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import CurrentTime from "./current-time";
import UserProfile from "./user-profile";
import ClientOnly from "../client-only";

export default function PageHeader() {
  const pathname = usePathname();

  const links: NavigationLink[] = [
    {
      link: {
        href: "/",
      },
      menu: {
        active: pathname == "/",
      },
      title: "Главная",
    },
  ];

  return (
    <header className="flex justify-between items-center p-2 px-6 border-b bg-stone-800">
      <NavigationMenu className="hidden md:flex" links={links} />

      <Sheet>
        <SheetTrigger className="flex md:hidden" asChild>
          <Button
            className="bg-accent/10 hover:bg-accent/20 active:bg-accent/10"
            size="icon"
          >
            <Icon path={mdiMenu} size={1} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 block md:hidden">
          <SheetHeader className="items-center">
            <SheetTitle className="mb-4">Меню</SheetTitle>
            <NavigationMenu links={links} column />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <CurrentTime className="hidden sm:block" />
      <ClientOnly>
        <UserProfile />
      </ClientOnly>
    </header>
  );
}
