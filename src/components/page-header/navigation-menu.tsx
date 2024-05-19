import Link from "next/link";
import { ComponentProps } from "react";
import * as Navigation from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof Link>;
type MenuLinkProps = ComponentProps<typeof Navigation.NavigationMenuLink>;
export type NavigationLink = {
  link: LinkProps;
  menu: MenuLinkProps;
  title: string;
};

export default function NavigationMenu({
  links,
  className,
  column,
}: {
  links: NavigationLink[];
  className?: string | undefined;
  column?: boolean;
}) {
  const classes = cn(
    Navigation.navigationMenuTriggerStyle(),
    "md:bg-transparent md:hover:bg-accent/10 md:focus:bg-accent/10 md:text-accent/50 md:hover:text-accent/75 md:data-[active]:bg-accent/10 md:data-[active]:text-accent"
  );
  const columnClass = column ? "flex-col gap-2" : "";

  return (
    <>
      <Navigation.NavigationMenu className={className}>
        <Navigation.NavigationMenuList className={columnClass}>
          {links.map((link, index) => (
            <Navigation.NavigationMenuItem key={index}>
              <Link {...link.link} passHref legacyBehavior>
                <Navigation.NavigationMenuLink
                  className={classes}
                  {...link.menu}
                >
                  {link.title}
                </Navigation.NavigationMenuLink>
              </Link>
            </Navigation.NavigationMenuItem>
          ))}
        </Navigation.NavigationMenuList>
      </Navigation.NavigationMenu>
    </>
  );
}
