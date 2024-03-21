"use client";

import styles from "./styles.module.css";

import { useEffect, useState } from "react";

import Image from "next/image";

import LogoAnimated from "@/assets/images/logo-animated-full.svg";
import { SubmitButton } from "../login/submit-button";
import { updateUserPassword } from "../login/sign-functions";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword({
    searchParams,
}: {
    searchParams: { message?: string, error_description: string };
}) {
    const [userPassword, setUserPassword] = useState<string>("");

    const animatedGradient = styles.combinedEffect;

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => { console.log(event) });
    }, [])

    return (
        <div className="mx-auto h-screen flex justify-center items-center bg-login-bg bg-cover bg-no-repeat transition-all duration-300 ease-out">
            {searchParams?.error_description ?
                <div className="max-[375px]:w-[80%] max-[430px]:w-[80%] max-sm:max-w-[90%] max-md:max-w-[80%] max-xg:max-w-[60%] max-sm:py-6 bg-pdgBlack-900 m-8 p-4  rounded-2xl justify-center flex flex-col md:flex-row transition-all duration-300 ease-out">
                    <p className="p-4 bg-foreground/10 text-foreground text-center text-slate-50">
                        Link inválido ou expirado!
                    </p>
                </div>
                :

                <div className="max-[375px]:w-[80%] max-[430px]:w-[80%] max-sm:max-w-[90%] max-md:max-w-[80%] max-xg:max-w-[60%] max-sm:py-6 bg-pdgBlack-900 m-8 px-2 sm:px-4 md:px-8 sm:gap-8 rounded-2xl justify-center flex flex-col md:flex-row transition-all duration-300 ease-out"
                >
                    <div className="h-auto w-full flex flex-1 justify-center">

                        <div className="gap-4 flex flex-col max-sm:items-center min-md:pl-8 items-center">
                            <h1 className="font-bold mt-8 text-2xl xl:text-4xl text-pdgWhite-50 text-center">
                                Não deixe o jogo pausar!
                            </h1>
                            <p className="font-normal text-base text-pdgWhite-50 text-center max-w-64">
                                Vamos criar uma nova senha!
                            </p>
                            <Image
                                src={LogoAnimated}
                                alt="PDG"
                                className="max-sm:w-[50%] w-[70%] sm:w-full hover:scale-105 transition-all duration-300 ease-out"
                            />
                        </div>

                    </div>
                    <div className="flex flex-1 px-4 py-0 md:p-8 gap-8 flex-col transition-all duration-300 ease-out">

                        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-8 text-foreground">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-normal text-base text-pdgWhite-50"
                                        htmlFor="new_password"
                                    >
                                        Nova senha<span className="text-red-600"> *</span>
                                    </label>

                                    <input
                                        className={`bg-pdgBlack-500 border-pdgBlack-500 rounded-lg p-4 gap-[10px] bg-inherit border text-pdgWhite-50 focus:bg-slate-800 ${searchParams?.message && "border-red-500"}`}
                                        name="new_password"
                                        type="password"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        required
                                    />
                                    <p
                                        className="text-red-500 box-content text-left text-xs font-medium"
                                    >
                                        Mínimo de 8 caracteres
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:flex-row">
                                <SubmitButton
                                    formAction={updateUserPassword}
                                    className={`w-full rounded-lg  py-[18px] px-4 gap-[10px]
                                text-base font-bold text-pdgWhite-50 flex flex-1 justify-center 
                                ${userPassword.length <= 7 ? "bg-pdgBlack-500 cursor-not-allowed" : animatedGradient}
                                ${userPassword.length > 7 && "hover:scale-105 active:border active:border-pdgWhite-50"}
                                transition duration-300 ease-in-out`}
                                    disabled={(userPassword) === "" ? true : false}
                                    pendingText="Enviando..."
                                >
                                    Enviar
                                </SubmitButton>

                            </div>
                        </form>

                    </div>
                </div>
            }
        </div>
    );
}
