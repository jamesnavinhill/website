import React from "react";

interface TypographyProps {
  as?: React.ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "overline";
  children: React.ReactNode;
  className?: string;
}

export function Typography({
  as,
  variant = "body",
  children,
  className = "",
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const variantStyles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
    body: "leading-7",
    caption: "text-sm text-muted-foreground",
    overline:
      "text-xs font-medium uppercase tracking-wider text-muted-foreground",
  };

  const defaultElement = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "p",
    caption: "span",
    overline: "span",
  } as const;

  const Component = as || defaultElement[variant];

  return React.createElement(
    Component,
    {
      className: `${variantStyles[variant]} ${className}`,
      ...props,
    },
    children
  );
}
