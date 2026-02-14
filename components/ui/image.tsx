"use client";

import * as React from "react";
import NextImage, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

function ImageWrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Image({
  src,
  alt = "Image",
  className,
  ...props
}: Omit<ImageProps, "alt"> & {
  src?: string;
  alt?: string;
  className?: string;
}) {
  const [hasError, setHasError] = React.useState<string | null>(null);

  if (!src || hasError === src) return null;

  return (
    <NextImage
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

type ImageFallbackProps = React.HTMLAttributes<HTMLDivElement>;

function ImageFallback({ className, children, ...props }: ImageFallbackProps) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted [&>svg]:text-muted-foreground pointer-events-none absolute z-[-1] flex size-full items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Image, ImageWrapper, ImageFallback };
