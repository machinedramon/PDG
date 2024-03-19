'use server'

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signUp = async (formData: FormData) => {

    const origin = headers().get("origin");
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
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
                first_name: first_name,
                last_name: last_name,
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
        return redirect(`/subscribe?message=Could not create user`);
    }

    return redirect(`/confirm-email?first_name=${first_name}&last_name=${last_name}&email=${email}`);
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