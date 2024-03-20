'use client'

import Link from "next/link";
import { SubmitButton } from "./submit-button";

import { signIn, signUp } from './sign-functions'
import { useEffect, useState } from "react";

import Image from "next/image";

import LogoAnimated from "@/assets/images/logo-animated-full.svg";
import BgLogin from '@/assets/images/login_bg.png';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const [loginOption, setLoginOption] = useState<boolean>(true) //true = login; false =  forgot password

  const toogleLoginOption = () => {
    setLoginOption(!loginOption);
  };

  useEffect(() => {
    signIn
  }, [])

  return (
    <div className="mx-auto  min-h-screen flex justify-center items-center bg-login-bg bg-cover bg-no-repeat">
      <div className="bg-pdgBlack-900 m-4 p-4 max-w-[949px] w-[100%] rounded-lg gap-8 justify-center flex flex-row">
        <Image src={LogoAnimated} alt="PDG" className="h-auto w-cover flex flex-1" />
        <div className='flex flex-1 p-8 gap-8 flex-col'>
          <div className='gap-4 flex flex-col'>
            <h1 className='font-bold text-4xl text-pdgWhite-50 w-max'>Pronto para começar?</h1>
            <p className='font-normal text-base text-pdgWhite-50 text-center'>Entre ou cadastre-se para começar a explorar!</p>
          </div>
          {loginOption ?
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
              <div className="flex flex-col gap-2">
                <label className="text-normal text-base text-pdgWhite-50" htmlFor="email">
                  Email<span className='text-red-600'> *</span>
                </label>

                <input
                  className={`bg-pdgBlack-500 border-pdgBlack-500 rounded-lg p-4 gap-[10px] bg-inherit border text-pdgWhite-50 focus:bg-slate-800 ${searchParams?.message && 'border-red-500'}`}
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-normal text-base text-pdgWhite-50" htmlFor="password">
                  Senha<span className='text-red-600'> *</span>
                </label>

                <input
                  className={`bg-pdgBlack-500 border-pdgBlack-500 rounded-lg p-4 gap-[10px] bg-inherit border text-pdgWhite-50 focus:bg-slate-800 ${searchParams?.message && 'border-red-500'}`}
                  name="password"
                  type="password"
                  required
                />
              </div>
              <button
                onClick={toogleLoginOption} type="button"
                className="text-pdgBlue-500 hover:underline box-content text-left text-xs font-medium"
              >
                Esqueci minha senha
              </button>

              <div className='flex gap-4 items-center'>

                <SubmitButton
                  formAction={signIn}
                  className=" rounded-lg border border-pdgBlack-500 py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50 flex flex-1 justify-center hover:scale-105
                  bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]
                  active:border active:border-pdgWhite-50
                  "
                  pendingText="Entrando..."
                >
                  Entrar
                </SubmitButton>

                <p className='text-base font-bold text-[#fff]'>ou</p>

                <SubmitButton
                  formAction={signUp}
                  className="bg-pdgBlack-500 rounded-lg border border-pdgBlack-500 py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50  flex flex-1 justify-center hover:scale-105
                  bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]
                  active:border active:border-pdgWhite-50
                  
                  "
                  pendingText="Registrando..."
                >
                  Registrar
                </SubmitButton>
                {searchParams?.message && (
                  <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-red-500">
                    Usuário ou senha inválidos
                  </p>
                )}
              </div>
            </form>
            :
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
              <label className="text-md text-slate-50 text-xl" htmlFor="email">
                Recupere sua conta
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                name="email"
                placeholder="Email"
                required
              />
              <SubmitButton
                formAction={signIn}
                className="bg-sky-400 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-sky-600 active:bg-sky-500 transition-all text-slate-50 font-bold"
                pendingText="Entrando..."
              >
                Enviar
              </SubmitButton>

              <button
                onClick={toogleLoginOption}
                className="text-slate-50 hover:underline box-content mx-auto"
              >
                Voltar
              </button>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </form>
          }
        </div>
      </div>
    </div >
  );
}
