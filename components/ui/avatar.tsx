"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

type AvatarImageProps = Omit<ImageProps, "alt" | "fill"> & {
  src?: string;
  alt?: string;
  className?: string;
};

function AvatarImage({
  src,
  alt = "Avatar",
  className,
  ...props
}: AvatarImageProps) {
  const [hasError, setHasError] = React.useState<string | null>(null);

  if (!src || hasError === src) return null;

  return (
    <Image
      data-slot="avatar-image"
      src={src}
      alt={alt}
      fill
      className={cn("size-full object-cover", className)}
      onError={() => {
        console.warn("Image failed to load:", src);
        setHasError(src);
      }}
      {...props}
    />
  );
}
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted [&>svg]:text-muted-foreground flex size-full items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
