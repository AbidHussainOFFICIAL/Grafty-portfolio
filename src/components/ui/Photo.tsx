import Image, { type ImageProps } from "next/image";
import { blurDataUrls } from "@/data/blur";

type PhotoProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { src: string };

/** next/image with the blurred preview from `data/blur.ts`, when there is one for this file. */
export function Photo({ src, ...props }: PhotoProps) {
  const blur = blurDataUrls[src];
  return blur ? <Image src={src} placeholder="blur" blurDataURL={blur} {...props} /> : <Image src={src} {...props} />;
}
