'use client'

import Link from "next/link";

import { useState } from "react";
import { SubmitButton } from "../login/submit-button";
import { signUp } from "../login/sign-functions";

import logoPDG from '../../../assets/logo/PDG.svg'
import Image from "next/image";


export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const [loginOption, setLoginOption] = useState<boolean>(true) //true = login; false =  forgot password

    const toogleLoginOption = () => {
        setLoginOption(!loginOption);
    };

    return (
        <div className="mx-auto bg-neutral-900/[.80] min-h-screen flex justify-center items-center">
            <div className="max-w-screen-lg flex flex-row px-4">
                {/* <div className="flex items-center">
                    <p className='text-4xl text-slate-100'>
                        Compartilhe seus momentos épicos.<br />
                        Sua jornada gamer, nossa comunidade.<br />
                        PDG, onde as histórias de jogos ganham vida!
                    </p>
                </div> */}
                <div className="bg-neutral-900/[.90] p-4 w-fit rounded-lg flex-1 flex justify-center flex-col">
                    <Image src={logoPDG} alt="PDG" className="h-40 w-auto mb-6" />

                    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                        <div>
                            {/* NOME */}
                            <label className="text-md hidden" htmlFor="nome">
                                Nome
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                                name="nome"
                                placeholder="Nome"
                                type="text"
                                required
                            />
                            {/* SOBRENOME */}
                            <label className="text-md hidden" htmlFor="sobrenome">
                                Sobrenome
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                                name="sobrenome"
                                placeholder="Sobrenome"
                                type="text"
                                required
                            />
                        </div>
                        <label className="text-md hidden" htmlFor="email">
                            Email
                        </label>

                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                            name="email"
                            type="email"
                            placeholder="Email*"
                            required
                        />
                        <label className="text-md hidden" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                            type="password"
                            name="password"
                            placeholder="Nova senha*"
                            required
                        />
                        <label className="text-md hidden" htmlFor="password">
                            Data de nascimento
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                            type="date"
                            name="data"
                            placeholder="Data"
                            required
                        />

                        <p className="text-xl text-slate-50">Gênero:</p>
                        <div className="flex flex-row gap-4">
                            <span className='text-slate-50 p-2 rounded-lg border-l-slate-50 border-2'>
                                <input type="radio" id="homem" name="genero" value="Homem" className=" checked:bg-blue-400" />
                                <label htmlFor="html" className="pl-2">Homem</label>
                            </span>
                            <span className='text-slate-50 p-2 rounded-lg border-l-slate-50 border-2'>
                                <input type="radio" id="mulher" name="genero" value="Mulher" />
                                <label htmlFor="css" className="pl-2">Mulher</label><br />
                            </span>
                            <span className='text-slate-50 p-2 rounded-lg border-l-slate-50 border-2'>
                                <input type="radio" id="personalizado" name="genero" value="Personalizado" />
                                <label htmlFor="javascript" className="pl-2">Personalizado</label>
                            </span>
                        </div>

                        <div className="flex items-center">
                            <input type="radio" id="option1" name="option" className="hidden" />
                            <label htmlFor="option1" className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mr-2">
                                Opção 1
                            </label>

                            <input type="radio" id="option2" name="option" className="hidden checked:bg-blue-600" />
                            <label htmlFor="option2"
                                className="cursor-pointer bg-gray-200 hover:bg-gray-300 checked:bg-sky-600 rounded-md py-2 px-4  ">
                                Opção 2
                            </label>
                        </div>

                        <hr className="bg-slate-50" />

                        <SubmitButton
                            formAction={signUp}
                            className="rounded-md px-4 py-2 text-foreground mb-2 bg-violet-400 text-slate-50 hover:bg-violet-600 active:bg-violet-500 transition-all font-bold"
                            pendingText="Redirecionando..."
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
        </div >
    );
}
