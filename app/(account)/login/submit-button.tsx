"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      className={`transition duration-300 ease-in-out ${props.className} ${
        pending ? "opacity-75" : "hover:opacity-90"
      } `}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
