import React from "react";
import { cn } from "@/utils/cn";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
return (
  <div
  {...props}
  className={cn("w-full bg-white border rounded-x flex py-4 shadow sm gap-1",props.className)}
    >
    </div>
  );
}
