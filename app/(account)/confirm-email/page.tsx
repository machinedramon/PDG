
interface SearchParamsType {
    searchParams: {
        name: string;
        lastName: string;
        nickname: string;
        email: string;
        message: string
    }
}

export default async function ConfirmEmail({ searchParams }: SearchParamsType) {

    return (
        <>
            <div className="mx-auto bg-zinc-900 min-h-screen flex justify-center items-center">
                <div className="max-w-screen-lg flex flex-row px-4">
                    <div className="bg-blue-950/[.30] p-4 w-fit rounded-lg flex-1 flex justify-center flex-col]">
                        {searchParams.name && (
                            <>
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-slate-50">
                                    Bem-vindo à PDG {searchParams.name} {searchParams.lastName}, uma email foi enviado para o endereço: <b>{searchParams.email}</b>. Por favor confirme para que possamos continuar!
                                </p>
                            </>
                        )}
                    </div>
                </div >
            </div >
        </>
    )
}