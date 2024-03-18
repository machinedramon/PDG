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
    const data = formData.get("data");
    const genero = formData.get("genero") as string;
    const pronome = formData.get("pronome") as string;

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return redirect(`/confirm-email?name=${name}&lastName=${lastName}&nickname=${nickname}&email=${email}`);
        // return redirect(`/login?message=Could not authenticate user`);
    }

    return redirect(`/confirm-email?name=${name}&lastName=${lastName}&nickname=${nickname}&email=${email}`);
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