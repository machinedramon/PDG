'use server'

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signUp = async (formData: FormData) => {

    const origin = headers().get("origin");
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;
    const nickname = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const birthday = formData.get("data");
    const genero = formData.get("genero") as string;
    const pronome = formData.get("pronome") as string;

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                // id: data.user.id,
                first_name: name,
                last_name: lastName,
                nickname: nickname,
                birthdate: birthday,
                gender: genero,
                pronoum: pronome,
            }
        },
    });

    console.log('data', data)

    if (error) {
        console.log(error)
        return redirect(`/subscribe?message=Could not authenticate user`);
    }

    // Após a criação bem-sucedida do usuário, insira os detalhes adicionais na tabela user_profiles
    if (data.user) {
        await supabase
            .from('user_profiles')
            .insert([
                {
                    id: data.user.id,
                    first_name: name,
                    last_name: lastName,
                    nickname: nickname,
                    birthdate: birthday,
                    gender: genero,
                    pronoum: pronome,
                }
            ]);
    }

    return redirect(`/confirm-email?message=Check email to continue sign in process&name=${name}&lastName=${lastName}&nickname=${nickname}&email=${email}`);
    // return redirect(`/confirm-email?message=Check email to continue sign in process`);
};

const signIn = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return error;
    }

    return redirect("/feed");
};

export { signIn, signUp }