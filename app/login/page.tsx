import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { useState } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {


  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="mx-auto min-h-screen overflow-hidden">
      <section id='login' className='h-screen'>
        {/* <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2"> */}
        <div className="bg-neutral-900/[.80] min-h-screen  flex justify-center items-center flex-col">
          <div className="bg-neutral-900/[.90] p-4 w-fit rounded-lg">
            <p className='font-bold text-[5rem] text-gray-50 text-center'>
              PDG
            </p>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
              {/* <label className="text-md" htmlFor="email">
              Email
            </label> */}
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="Email"
                required
              />
              {/* <label className="text-md" htmlFor="password">
              Password
            </label> */}
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="Senha"
                required
              />
              <SubmitButton
                formAction={signIn}
                className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing In..."
              >
                Entrar
              </SubmitButton>
              <Link
                href='#forgot'
                className="text-slate-50 hover:underline box-content mx-auto"
              >
                Esqueci minha senha
              </Link>

              <hr className="bg-slate-50" />

              <p className='font-bold text-[1rem] text-gray-50 text-center'>
                Não possui conta?
              </p>

              <SubmitButton
                formAction={signUp}
                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing Up..."
              >
                Cadastre-se
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      <section id='forgot'>
        <div className="bg-neutral-900/[.80] min-h-screen  flex justify-center items-center flex-col">
          <div className="bg-neutral-900/[.90] p-4 w-fit rounded-lg">
            <p className='font-bold text-[5rem] text-gray-50 text-center'>
              PDG
            </p>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
              {/* <label className="text-md" htmlFor="email">
              Email
            </label> */}
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="Email"
                required
              />
              <SubmitButton
                formAction={signIn}
                className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing In..."
              >
                Enviar
              </SubmitButton>

              <Link
                href='#login'
                className="text-slate-50 hover:underline box-content mx-auto"
              >
                Voltar
              </Link>

              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div >
  );
}
