'use server'

interface SearchParamsType {
    searchParams: {
        id: string;
        email: string;
    }
}

export default async function ConfirmEmail({ searchParams }: SearchParamsType) {

    return (
        <div className="mx-auto h-screen flex justify-center items-center bg-login-bg bg-cover bg-no-repeat transition-all duration-300 ease-out">
            <div className="max-[375px]:w-[80%] max-[430px]:w-[80%] max-sm:max-w-[90%] max-md:max-w-[80%] max-xg:max-w-[60%] max-sm:py-6 bg-pdgBlack-900 m-8 p-4  rounded-2xl justify-center flex flex-col md:flex-row transition-all duration-300 ease-out">
                {searchParams.email && (
                    <p className="p-4 bg-foreground/10 text-foreground text-center text-slate-50">
                        Bem-vindo à PDG, uma email foi enviado para o endereço: <b>{searchParams.email}</b>. Por favor confirme para que possamos continuar!
                    </p>
                )}
            </div>
        </div >
    )
}