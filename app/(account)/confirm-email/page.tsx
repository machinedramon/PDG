"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import GetUser from "./GetUser";

interface SearchParamsType {
    searchParams: {
        name: string;
        lastName: string;
        nickname: string;
        email: string
    }
}

export default async function ConfirmEmail({ searchParams }: SearchParamsType) {

    const supabase = createClient();

    const [userUUID, setUserUUID] = useState<any>(null)
    const [userError, setUserError] = useState<any>(null)


    useEffect(() => {
        // const fetchUserUUID = async () => {
        // const { data, error } = await supabase
        //     .from('auth/users')
        //     .select()

        // if (error) {
        //     setUserError('Could not fetch the data')
        //     setUserUUID(null)
        //     console.log(error)
        // }

        // if (data) {
        //     setUserUUID(data)
        //     setUserError(null)
        //     console.log(data)
        // }
        // }

        const userConfirm = GetUser('yargo@cpqd.com.br').then((res) => {
            console.log('res', res?.id, res?.email)
        }).catch(error => console.log('error', error))

        // fetchUserUUID()

        console.log('userConfirm', userConfirm)

    }, [])

    return (
        <>
            {userUUID && <div>{userUUID}</div>}
            <div className="mx-auto bg-zinc-900 min-h-screen flex justify-center items-center">
                <div className="max-w-screen-lg flex flex-row px-4">
                    <div className="bg-blue-950/[.30] p-4 w-fit rounded-lg flex-1 flex justify-center flex-col">
                        {searchParams && (
                            <>
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                    {searchParams.name}
                                </p>
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                    {searchParams.lastName}
                                </p>
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                    {searchParams.nickname}
                                </p>
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                    {searchParams.email}
                                </p>
                            </>
                        )}
                    </div>
                </div >
            </div >
        </>
    )
}