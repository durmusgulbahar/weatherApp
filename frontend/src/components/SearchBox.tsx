import { cn } from "@/utils/cn";
import React from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn("flex relative items-center justify-center h-10", props.className)}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location..."
        className="p-3 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-r-md">
        <CiSearch className="text-2xl" />
      </button>
    </form>
  );
}
