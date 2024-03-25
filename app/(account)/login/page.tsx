"use client";

import { SubmitButton } from "./submit-button";
import styles from "./styles.module.css";
import uploadIcon from "../../../assets/icons/arrow-down.svg";

import { AnimatePresence, motion } from "framer-motion";

import { resetPassword, signIn, signUp, updateUserData } from "./sign-functions";
import { ChangeEvent, useEffect, useState } from "react";

import Image from "next/image";

import LogoAnimated from "@/assets/images/logo-animated-full.svg";
import animationRecovery from "@/assets/images/recovery.gif";

export default function Login({
  searchParams,
}: {
  searchParams: {
    message?: string;
    success?: string;
    reset_success?: string;
    login?: string;
    user_id?: string;
  };
}) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userResetEmail, setUserResetEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [userId, setUserId] = useState<string>('')
  const [userName, setUserName] = useState<string>("");
  const [userSurname, setUserSurname] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("")
  const [birthMonth, setBirthMonth] = useState<string>("")
  const [birthYear, setBirthYear] = useState<string>("")
  const [userGender, setUserGender] = useState<string>("")
  const [userPhone, setUserPhone] = useState<string>("")

  const [userImage, setUserImage] = useState<string | null>(null);

  const animatedGradient = styles.combinedEffect;
  const animatedGradient2 = styles.combinedEffect2;

  const [loginOption, setLoginOption] = useState<boolean>(true); //true = login; false =  forgot password

  const toogleLoginOption = () => {
    setLoginOption(!loginOption);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedImage = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUserImage(reader.result);
        }
      };

      reader.readAsDataURL(uploadedImage);
    }
  };

  useEffect(() => {
    searchParams?.user_id &&
      setUserId(searchParams.user_id)
  }, [])

  return (
    <div className="mx-auto sm:h-screen flex justify-center items-center bg-login-bg bg-cover bg-no-repeat transition-all duration-300 ease-out">
      <AnimatePresence mode="wait">
        <motion.div
          key={loginOption ? "login" : "forgotPassword"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          layout
          className="max-[375px]:w-[80%] max-[430px]:w-[80%] max-sm:max-w-[90%] max-md:max-w-[80%] max-xg:max-w-[60%] max-sm:py-6 bg-pdgBlack-900 m-8 px-2 sm:px-4 md:px-4 lg:px-8 sm:gap-8 rounded-2xl justify-center flex flex-col md:flex-row transition-all duration-300 ease-out"
        >
          {searchParams?.login === 'unfinished' ?
            <form className='flex flex-col gap-4 sm:gap-8 m-2 sm:m-4 md:sm-8'>
              <div className="gap-2 sm:gap-4 flex flex-col items-center">
                <h1 className={`${styles.h1}`}>Quase lá</h1>
                <p className={`${styles.text}`}>Precisamos de alguns detalhes adicionais antes de continuar</p>
              </div>
              <div className='gap-8 flex flex-col md:flex-row'>
                {/* AVATAR */}
                <div className='gap-[10px] flex flex-col w-full'>
                  <p className={`${styles.text}`}>Avatar<span className="text-red-600"> *</span></p>
                  <label className='relative w-[160px] h-[160px] rounded-2xl bg-pdgBlack-500 overflow-hidden'>
                    <input
                      type='file'
                      name="userImage"
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    />
                    <div
                      className='absolute inset-0 w-full h-full bg-cover bg-center flex place-content-center cursor-pointer hover:bg-slate-800'
                      style={{ backgroundImage: userImage ? `url(${userImage})` : 'none' }}
                    >
                      {!userImage &&
                        <>
                          <Image src={uploadIcon} alt='' className='text-white text-3xl' />
                          <span className='sr-only'>Selecione uma imagem</span>
                        </>
                      }
                    </div>
                  </label>
                </div>
                {/* nomes e generos */}
                <div className='flex flex-col gap-y-8'>
                  <div className='gap-2 sm:gap-4 flex flex-col md:flex-row'>
                    <input className='hidden' type="text" name="userId" value={userId} required readOnly />
                    <div className="flex flex-col gap-2">
                      <label
                        className={`${styles.text}`}
                        htmlFor="userName"
                      >
                        Nome<span className="text-red-600"> *</span>
                      </label>

                      <input
                        className={`${styles.inputMoreDetails} w-full md:w-56`}
                        name="userName"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className={`${styles.text}`}
                        htmlFor="userSurname"
                      >
                        Sobrenome<span className="text-red-600"> *</span>
                      </label>

                      <input
                        className={`${styles.inputMoreDetails}  w-full md:w-56`}
                        name="userSurname"
                        type="text"
                        value={userSurname}
                        onChange={(e) => setUserSurname(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='gap-2 sm:gap-4 flex flex-col md:flex-row'>
                    <div className="flex flex-col gap-2">
                      <label
                        className={`${styles.text}`}
                        htmlFor="userNickname"
                      >
                        Nome de usuário<span className="text-red-600"> *</span>
                      </label>

                      <div className={`${styles.inputMoreDetails} w-full md:w-56 relative flex items-center`}>
                        @
                        <input
                          className={` h-full bg-transparent w-full md:w-56 absolute top-0 left-0 pl-8`}
                          name="userNickname"
                          type="text"
                          value={userNickname}
                          onChange={(e) => setUserNickname(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className={`${styles.text}`}
                        htmlFor="surname"
                      >
                        Gênero<span className="text-red-600"> *</span>
                      </label>

                      <select
                        className={`${styles.inputMoreDetails} w-full md:w-56`}
                        name="gender"
                        value={userGender}
                        onChange={(e) => setUserGender(e.target.value)}
                        required
                      >
                        <option value=""></option>
                        <option value="Ele">Ele</option>
                        <option value="Ela">Ela</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* DATA DE NASCIMENTO E TELEFONE */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex flex-col gap-y-2 flex-1'>
                  <label
                    className={`${styles.text}`}
                    htmlFor="name"
                  >
                    Data de nascimento<span className="text-red-600"> *</span>
                  </label>
                  <div className="flex flex-col md:flex-row gap-2">
                    <select
                      className={`${styles.inputMoreDetails} `}
                      name="birthDay"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      required
                    >
                      <option value="">Dia</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>


                    <select
                      className={`${styles.inputMoreDetails} `}
                      name="birthMonth"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      required
                    >
                      <option value="">Mês</option>
                      {[
                        "Janeiro",
                        "Fevereiro",
                        "Março",
                        "Abril",
                        "Maio",
                        "Junho",
                        "Julho",
                        "Agosto",
                        "Setembro",
                        "Outubro",
                        "Novembro",
                        "Dezembro",
                      ].map((month, index) => (
                        <option key={index + 1} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>


                    <select
                      className={`${styles.inputMoreDetails} `}
                      name="birthYear"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      required
                    >
                      <option value="">Ano</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </select>

                  </div>
                </div>
                <div className="flex flex-col gap-2  flex-1">
                  <label
                    className={`${styles.text}`}
                    htmlFor="phone"
                  >
                    Telefone<span className="text-red-600"> *</span>
                  </label>

                  <input
                    className={`${styles.inputMoreDetails} `}
                    name="phone"
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <SubmitButton
                formAction={updateUserData}
                className={`w-full rounded-lg  py-[18px] px-4 gap-[10px]
                  text-base font-bold text-pdgWhite-50 flex flex-1 justify-center 
                  ${(userName && userSurname && userNickname && userGender && birthDay && birthMonth && birthYear && userImage) === "" ? "bg-pdgBlack-500 cursor-not-allowed" : animatedGradient}
                  ${(userName && userSurname && userNickname && userGender && birthDay && birthMonth && birthYear && userImage) !== "" && "hover:scale-105 active:border active:border-pdgWhite-50"}
                  transition duration-300 ease-in-out`}
                disabled={(userName || userSurname || userNickname || userGender || birthDay || birthMonth || birthYear || userImage) === "" ? true : false}
                pendingText="Acessando..."
              >
                Acessar PDG
              </SubmitButton>
              <p className={`text-[#f8f8f8] text-center text-xs leading-5`}>
                <b>DICA:</b> Quer dar um upgrade no seu perfil? Fácil!<br />
                Depois de entrar, é só dar um clique no seu avatar lá no topo<br />
                e selecionar "Configurações de Perfil". Tá na mão!
              </p>
            </form>
            :
            <>
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
                      Esqueceu sua senha?
                    </h1>
                    <p className="font-normal mb-8 text-base text-pdgWhite-50 text-center">
                      Vamos criar uma nova!
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
                    <div className="flex gap-4 items-center flex-col md:flex-row max-md:flex-row">
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
            </>
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
