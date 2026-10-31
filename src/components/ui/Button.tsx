import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type AnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

type NativeButtonProps = {
  href?: undefined;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "href" | "children" | "className">;

const base =
  "inline-flex items-center justify-center rounded-full bg-ink font-medium text-white transition duration-300 ease-out hover:bg-violet disabled:cursor-not-allowed disabled:opacity-60";

/** Solid black pill. Renders a link when `href` is given, otherwise a button. */
export function Button(props: AnchorProps | NativeButtonProps) {
  if (props.href === undefined) {
    const { children, className, type = "button", ...rest } = props;
    return (
      <button type={type} className={cn(base, className)} {...rest}>
        {children}
      </button>
    );
  }
  const { href, children, className, ...rest } = props;
  return (
    <a href={href} className={cn(base, className)} {...rest}>
      {children}
    </a>
  );
}
