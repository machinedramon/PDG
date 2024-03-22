'use server'

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signUp = async (formData: FormData) => {

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.log(error)
        return redirect("/subscribe?message=Could not create user");
    }

    return redirect(`/confirm-email?&email=${email}`);
};

const signIn = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    console.log(data.user?.phone)

    if (error) {
        return error;
    }

    console.log(data)

    if (data.user.phone === '') {
        return redirect(`/login?login=unfinished&user_id=${data.user.id}`)
    }

    // if (data.user.phone !== '') {
    //     return redirect("/feed")
    // }

    // return redirect("/feed");
};

const resetPassword = async (formData: FormData) => {

    const origin = headers().get("origin");
    const email = formData.get("email") as string;

    const supabase = createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/reset-password`,
    })

    if (error) {
        return error;
    }

    return redirect("/login?reset_success=Email enviado")
};

const updateUserPassword = async (formData: FormData) => {

    const new_password = formData.get("new_password") as string;

    const plain_password = { password: new_password }

    const supabase = createClient();

    const { data, error } = await supabase.auth.updateUser({
        password: plain_password.password
    })

    if (error) {
        return { error: error.message }; // Return a plain object with error message
    }

    return redirect("/login?reset_success=Senha resetada com sucesso");
};

const updateUserData = async (formData: FormData) => {

    const id = formData.get("userId") as string;
    const first_name = formData.get("userName") as string;
    const last_name = formData.get("userSurname") as string;
    const nickname = formData.get("userNickname") as string;
    // const birthDay = formData.get("birthDay");
    // const birthMonth = formData.get("birthMonth");
    // const birthYear = formData.get("birthYear");
    const genero = formData.get("gender") as string;
    const avatar = formData.get("userImage") as string;

    const supabase = createClient();

    // const birthDate = new Date(birthYear, birthMonth, birthDay)

    const { data, error } = await supabase
        .from('user_profiles')
        .update({
            first_name: first_name,
            last_name: last_name,
            nickname: '@' + nickname,
            // birthDate: birthDate,
            gender: genero,
            avatar_url: avatar,
        })
        .match({ id: id })

    console.log(data)

    if (error) {
        return { error: error.message }; // Return a plain object with error message
    }

    // return redirect("/login?reset_success=Senha resetada com sucesso");
};


export { signIn, signUp, resetPassword, updateUserPassword, updateUserData }

