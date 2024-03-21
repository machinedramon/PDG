'use server'

interface SearchParamsType {
    searchParams: {
        id: string;
        // first_name: string;
        // last_name: string;
        email: string;
    }
}

export default async function ConfirmEmail({ searchParams }: SearchParamsType) {

    return (
        <div className="mx-auto bg-zinc-900 min-h-screen flex justify-center items-center">
            <div className="max-w-screen-lg flex flex-row px-4">
                <div className="bg-blue-950/[.30] p-4 w-fit rounded-lg flex-1 flex justify-center flex-col]">
                    {searchParams.email && (
                        <>
                            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-slate-50">
                                Bem-vindo à PDG, uma email foi enviado para o endereço: <b>{searchParams.email}</b>. Por favor confirme para que possamos continuar!
                            </p>
                        </>
                    )}
                </div>
            </div >
        </div >
    )
}