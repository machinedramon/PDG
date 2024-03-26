'use server'

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

interface PropsData {
    dia: string;
    mes: string;
    ano: string;
}

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

    // console.log(data)

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

const uploadImage = async (imageFile: File, id: string) => {

    const supabase = createClient();
    let imageUrl = null;
    if (imageFile) {
        const fileExtension = imageFile.name.split(".").pop();
        const fileName = `${new Date().getTime()}.${fileExtension}`;
        const filePath = `${id}/avatar/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from("users")
                .upload(filePath, imageFile);

            if (uploadError) {
                throw new Error(uploadError.message);
            }

            const expiresIn = 60 * 60 * 24 * 365 * 20; // 20 years in seconds
            const { data: signedUrlData, error: signedUrlError } =
                await supabase.storage
                    .from("users")
                    .createSignedUrl(filePath, expiresIn, {
                        transform: {
                            width: 200,
                            height: 200,
                        },
                    });

            if (signedUrlError) {
                throw new Error(signedUrlError.message);
            }

            imageUrl = signedUrlData.signedUrl;
            console.log(imageUrl)
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Erro no upload: ${error.message}`);
            } else {
                toast.error("Erro desconhecido no upload.");
            }
            return imageUrl;
        }
    }
}




const updateUserData = async (formData: FormData) => {

    const id = formData.get("userId") as string;
    const first_name = formData.get("userName") as string;
    const last_name = formData.get("userSurname") as string;
    const nickname = formData.get("userNickname") as string;
    const birthDay = formData.get("birthDay");
    const birthMonth = formData.get("birthMonth");
    const birthYear = formData.get("birthYear");
    const genero = formData.get("gender") as string;
    const avatar = formData.get("userImage") as File;

    const supabase = createClient();

    console.log(formData)
    console.log(avatar)

    const signedAvatar = uploadImage(avatar, id)
    console.log('singedAvatar', signedAvatar)

    const dataString = `${birthDay}/${birthMonth}/${birthYear}`;
    const dataObj = new Date(dataString);

    console.log(dataObj)

    // const { data, error } = await supabase
    //     .from('user_profiles')
    //     .update({
    //         first_name: first_name,
    //         last_name: last_name,
    //         nickname: '@' + nickname,
    //         birthdate: dataObj,
    //         gender: genero,
    //         avatar_url: avatar,
    //     })
    //     .match({ id: id })

    // console.log(data)

    // if (error) {
    //     return { error: error.message }; // Return a plain object with error message
    // }

    // return redirect("/login?reset_success=Senha resetada com sucesso");
};


export { signIn, signUp, resetPassword, updateUserPassword, updateUserData }

