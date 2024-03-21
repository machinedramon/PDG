"use client";

import { useFormStatus } from "react-dom";
import { useState, type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function ToogleLoginOptionButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const [loginOption, setLoginOption] = useState<boolean>(true) //true = login; false =  forgot password

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} onClick={() => setLoginOption(!loginOption)} aria-disabled={pending} className="text-slate-50 hover:underline box-content mx-auto">
      {isPending ? pendingText : children}
    </button>
  );
}
