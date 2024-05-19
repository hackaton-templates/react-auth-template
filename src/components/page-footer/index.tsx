import { cn } from "@/lib/utils";

export default function PageFooter({ className }: { className?: string }) {
  const classes = cn(className, "p-2 w-full text-center opacity-30 text-sm");
  return <footer className={classes}>© 2024 mzhn-team </footer>;
}
