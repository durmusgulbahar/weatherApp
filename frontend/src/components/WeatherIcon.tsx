import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {
  src: string;
  alt: string;
};

export default function WeatherIcon(props: Props) {
  return (
    <div {...props} className={cn('relative h-20 w-20')}>
      <Image className="h-full w-full" src={props.src} alt={props.alt} width={100} height={100}></Image>
    </div>
  );
}
