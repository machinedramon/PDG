'use client'

import Link from "next/link";

import { useEffect, useState } from "react";
import { SubmitButton } from "../login/submit-button";
import { signUp } from "../login/sign-functions";

import Image from "next/image";

import LogoAnimated from "@/assets/images/logo-animated-full.svg";


export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const [selectedOption, setSelectedOption] = useState<string>('');

    const [selectedPronome, setSelectedPronome] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [senha, setSenha] = useState<string>('')
    const [confirmarSenha, setConfirmarSenha] = useState<string>('')
    const [senhaCoincide, setSenhaCoincide] = useState<boolean | null>(null)
    const [confirmacaoInteragida, setConfirmacaoInteragida] = useState(false);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handlePronomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPronome(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    // useEffect(() => {
    //     let timeoutId: NodeJS.Timeout;

    //     if (confirmacaoInteragida) {
    //         timeoutId = setTimeout(() => {
    //             if (senha === confirmarSenha) {
    //                 setSenhaCoincide(true);
    //             } else {
    //                 setSenhaCoincide(false);
    //             }
    //         }, 1500);
    //     }

    //     return () => clearTimeout(timeoutId);
    // }, [senha, confirmarSenha, confirmacaoInteragida]);

    // const handleConfirmarSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setConfirmarSenha(e.target.value);
    //     setConfirmacaoInteragida(true); // Marca que o usuário interagiu com a confirmação da senha
    // };

    return (
        <div className="mx-auto bg-zinc-900 min-h-screen flex justify-center items-center">
            <div className="max-w-screen-lg flex flex-row px-4">
                <div className="bg-blue-950/[.30] p-4 w-fit rounded-lg flex-1 flex justify-center flex-col">

                    <Image src={LogoAnimated} alt="PDG" className="h-40 w-auto mb-6" />

                    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                        <div className="flex gap-2">
                            {/* NOME */}
                            <label className="text-md hidden" htmlFor="first_name">
                                Nome
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                                name="first_name"
                                placeholder="Nome*"
                                type="text"
                                required
                            />
                            {/* SOBRENOME */}
                            <label className="text-md hidden" htmlFor="last_name">
                                Sobrenome
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                                name="last_name"
                                placeholder="Sobrenome"
                                type="text"
                            // required
                            />
                        </div>

                        {/* NICKNAME */}
                        <label className="text-md hidden" htmlFor="nickname">
                            Nickname
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                            name="nickname"
                            type="text"
                            placeholder="Apelido/Nickname*"
                        // required
                        />

                        {/* EMAIL */}
                        <label className="text-md hidden" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                            name="email"
                            type="email"
                            placeholder="Email*"
                            required
                        />

                        {/* PASSWORD */}
                        <div className="relative">
                            <label className="text-md hidden" htmlFor="password">
                                Senha
                            </label>
                            <input
                                className="block w-full rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Nova senha*"
                                onChange={e => setSenha(e.target.value)}
                                value={senha}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a9 9 0 016.364 4.364l3.535 3.536-1.414 1.414-3.535-3.536A9 9 0 019 12z" />
                                </svg>
                            </button>
                        </div>
                        {/* PASSWORD */}
                        <div className="relative">
                            <label className="text-md hidden" htmlFor="password">
                                Confirme a senha
                            </label>
                            <input
                                className="block w-full rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirme a senha*"
                                onChange={e => setConfirmarSenha(e.target.value)}
                                value={confirmarSenha}
                            // required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a9 9 0 016.364 4.364l3.535 3.536-1.414 1.414-3.535-3.536A9 9 0 019 12z" />
                                </svg>
                            </button>
                            {confirmacaoInteragida && !senhaCoincide && <p style={{ color: 'red' }}>As senhas não coincidem.</p>}
                        </div>

                        {/* DATA DE NASCIMENTO */}
                        <label className="text-md hidden" htmlFor="data">
                            Data de nascimento
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-1 placeholder:text-slate-50 text-slate-50 focus:bg-slate-800"
                            type="date"
                            name="data"
                            placeholder="Data"
                        // required
                        />

                        {/* GENERO */}
                        <p className="text-xl text-slate-50">Gênero:*</p>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="homem"
                                name="gender"
                                value="homem"
                                className="hidden"
                                onChange={handleOptionChange}
                            />
                            <label
                                htmlFor="homem"
                                className={`text-slate-50 p-2 rounded-lg border-l-slate-50 border cursor-pointer inline-block border-gray-300  mr-4 select-none transition duration-300 ease-in-out hover:bg-sky-500/[.80] ${selectedOption === 'homem' ? 'bg-sky-400/[.80]' : ''
                                    }`}
                            >
                                Homem
                            </label>

                            <input
                                type="radio"
                                id="mulher"
                                name="gender"
                                value="mulher"
                                className="hidden"
                                onChange={handleOptionChange}
                            />
                            <label
                                htmlFor="mulher"
                                className={`text-slate-50 p-2 rounded-lg border-l-slate-50 border cursor-pointer inline-block border-gray-300  mr-4 select-none transition duration-300 ease-in-out hover:bg-sky-500/[.80] ${selectedOption === 'mulher' ? 'bg-sky-400/[.80]' : ''
                                    }`}
                            >
                                Mulher
                            </label>

                            <input
                                type="radio"
                                id="personalizado"
                                name="gender"
                                value="personalizado"
                                className="hidden"
                                onChange={handleOptionChange}
                            />
                            <label
                                htmlFor="personalizado"
                                className={`text-slate-50 p-2 rounded-lg border-l-slate-50 border cursor-pointer inline-block border-gray-300  mr-4 select-none transition duration-300 ease-in-out hover:bg-sky-500/[.80] ${selectedOption === 'personalizado' ? 'bg-sky-400/[.80]' : ''
                                    }`}
                            >
                                Personalizado
                            </label>
                        </div>

                        {/* PRONOMES */}
                        <label className="text-md hidden" htmlFor="email">
                            Selecione seu pronome
                        </label>
                        {selectedOption === 'personalizado' &&
                            <select
                                className="block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={selectedPronome}
                                onChange={handlePronomeChange}
                            >
                                <option value="" disabled hidden>Selecione seu pronome</option>
                                <option value="ele">Ele</option>
                                <option value="ela">Ela</option>
                                <option value="ele(a)">Ele(a)</option>
                            </select>
                        }
                        <hr className="bg-slate-50" />

                        <SubmitButton
                            formAction={signUp}
                            className="rounded-md px-4 py-2 text-foreground mb-1 bg-violet-400 text-slate-50 hover:bg-violet-600 active:bg-violet-500 transition-all font-bold"
                            pendingText="Redirecionando..."
                        >
                            Cadastre-se
                        </SubmitButton>

                        <Link
                            href="/login"
                            className="rounded-md px-4 py-2 text-foreground mb-2 bg-red-400 text-slate-50 hover:bg-red-600 active:bg-red-500 transition-all font-bold text-center"
                        >
                            Cancelar
                        </Link>

                        {searchParams?.message && (
                            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-red-500">
                                {searchParams.message}
                            </p>
                        )}
                    </form>
                </div>
            </div >
        </div >
    );
}
