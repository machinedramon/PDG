"use client";

import { SubmitButton } from "./submit-button";
import styles from "./styles.module.css";

import { AnimatePresence, motion } from "framer-motion";

import { resetPassword, signIn, signUp } from "./sign-functions";
import { useState } from "react";

import Image from "next/image";

import LogoAnimated from "@/assets/images/logo-animated-full.svg";
import animationRecovery from "@/assets/images/recovery.gif";

export default function Login({
  searchParams,
}: {
  searchParams: {
    message?: string;
    success?: string;
    reset_success: string;
  };
}) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userResetEmail, setUserResetEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const animatedGradient = styles.combinedEffect;
  const animatedGradient2 = styles.combinedEffect2;

  const [loginOption, setLoginOption] = useState<boolean>(true); //true = login; false =  forgot password

  const toogleLoginOption = () => {
    setLoginOption(!loginOption);
  };

  return (
    <div className="mx-auto h-screen flex justify-center items-center bg-login-bg bg-cover bg-no-repeat transition-all duration-300 ease-out">
      <AnimatePresence mode="wait">
        <motion.div
          key={loginOption ? "login" : "forgotPassword"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          layout
          className="max-[375px]:w-[80%] max-[430px]:w-[80%] max-sm:max-w-[90%] max-md:max-w-[80%] max-xg:max-w-[60%] max-sm:py-6 bg-pdgBlack-900 m-8 px-2 sm:px-4 md:px-8 sm:gap-8 rounded-2xl justify-center flex flex-col md:flex-row transition-all duration-300 ease-out"
        >
          <div className="h-auto w-full flex flex-1 justify-center">
            {loginOption ? (
              <div className="gap-4 flex flex-col max-sm:items-center min-md:pl-8">
                <h1 className="font-bold mt-8 text-2xl xl:text-4xl text-pdgWhite-50 text-center">
                  Pronto para começar?
                </h1>
                <p className="font-normal text-base text-pdgWhite-50 text-center max-w-64">
                  Entre ou cadastre-se para começar a explorar!
                </p>
                <Image
                  src={LogoAnimated}
                  alt="PDG"
                  className="max-sm:w-[50%] w-[70%] sm:w-full hover:scale-105 transition-all duration-300 ease-out"
                />
              </div>
            ) : (
              <div className="gap-4 flex flex-col max-sm:items-center min-md:pl-8">
                <Image
                  alt=""
                  src={animationRecovery}
                  className={`max-sm:w-[90%] w-[70%] sm:w-full md:max-w-sm  hover:rotate-12 transition-all duration-300 ease-out scale-125`}
                />
                <h1 className="font-bold text-2xl xl:text-4xl text-pdgWhite-50 text-center">
                  Pronto para começar?
                </h1>
                <p className="font-normal mb-8 text-base text-pdgWhite-50 text-center">
                  Entre ou cadastre-se para começar a explorar!
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-1 px-4 py-0 md:p-8 gap-8 flex-col transition-all duration-300 ease-out">
            {loginOption ? (
              <form className="animate-in flex-1 flex flex-col w-full justify-center gap-8 text-foreground">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-normal text-base text-pdgWhite-50"
                      htmlFor="email"
                    >
                      Email<span className="text-red-600"> *</span>
                    </label>

                    <input
                      className={`bg-pdgBlack-500 border border-pdgBlack-500 rounded-lg p-4 gap-[10px] bg-inherit text-pdgWhite-50 focus:bg-slate-800 ${searchParams?.message && "border-red-500"}`}
                      name="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-normal text-base text-pdgWhite-50"
                      htmlFor="password"
                    >
                      Senha<span className="text-red-600"> *</span>
                    </label>

                    <input
                      className={`bg-pdgBlack-500 border-pdgBlack-500 rounded-lg p-4 gap-[10px] bg-inherit border text-pdgWhite-50 focus:bg-slate-800 ${searchParams?.message && "border-red-500"}`}
                      name="password"
                      type="password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                    <button
                      onClick={toogleLoginOption}
                      type="button"
                      className="text-pdgBlue-500 hover:underline box-content text-left text-xs font-medium"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:flex-row">
                  <SubmitButton
                    formAction={signIn}
                    className={`w-full rounded-lg  py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50 flex flex-1 justify-center 
                  ${(userPassword && userEmail) === "" ? "bg-pdgBlack-500 cursor-not-allowed" : animatedGradient}
                  ${(userPassword && userEmail) !== "" && "hover:scale-105 active:border active:border-pdgWhite-50"}
                  transition duration-300 ease-in-out`}
                    disabled={(userPassword || userEmail) === "" ? true : false}
                    pendingText="Entrando..."
                  >
                    Entrar
                  </SubmitButton>

                  <p className="text-base font-bold text-[#fff] hidden sm:flex">
                    ou
                  </p>

                  <SubmitButton
                    formAction={signUp}
                    className={`w-full rounded-lg py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50 flex flex-1 justify-center 
                  ${(userPassword && userEmail) === "" ? "bg-pdgBlack-500 cursor-not-allowed" : animatedGradient2}
                  ${(userPassword && userEmail) !== "" && "hover:scale-105 active:border active:border-pdgWhite-50"}
                  transition duration-300 ease-in-out`}
                    disabled={(userPassword || userEmail) === "" ? true : false}
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
                {searchParams?.message && (
                  <p className="bg-foreground/10 text-foreground text-center text-red-500">
                    Usuário ou senha inválidos
                  </p>
                )}
                {searchParams?.reset_success && (
                  <p className="bg-foreground/10 text-foreground text-center text-green-500">
                    {searchParams.reset_success}
                  </p>
                )}
              </form>
            ) : (
              <form
                noValidate
                className="animate-in flex-1 flex flex-col w-full justify-center gap-8 text-foreground"
              >
                <div className="flex flex-col gap-2">
                  <label
                    className="text-normal text-base text-pdgWhite-50"
                    htmlFor="email"
                  >
                    Email<span className="text-red-600"> *</span>
                  </label>

                  <input
                    className={`bg-pdgBlack-500 border-pdgBlack-500 rounded-lg p-4 gap-[10px] bg-inherit border text-pdgWhite-50 focus:bg-slate-800 ${searchParams?.message && "border-red-500"}`}
                    name="email"
                    type="email"
                    value={userResetEmail}
                    onChange={(e) => setUserResetEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={toogleLoginOption}
                    className=" rounded-lg border-lg border-pdgBlack-500 py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50  flex flex-1 justify-center hover:scale-105
                  bg-red-500
                  active:border active:border-pdgWhite-50
                  transition duration-300 ease-in-out"
                  >
                    Voltar
                  </button>

                  <SubmitButton
                    formAction={resetPassword}
                    className={`rounded-lg  py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50 flex flex-1 justify-center 
                  ${userResetEmail === "" ? "bg-pdgBlack-500 cursor-not-allowed" : animatedGradient}
                  ${userResetEmail !== "" && "hover:scale-105 active:border active:border-pdgWhite-50"}
                  transition duration-300 ease-in-out`}
                    disabled={userResetEmail === "" ? true : false}
                    pendingText="Enviando..."
                  >
                    Enviar
                  </SubmitButton>
                </div>
                {searchParams?.reset_success && (
                  <p className="bg-foreground/10 text-foreground text-center text-green-500">
                    {searchParams.reset_success}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
