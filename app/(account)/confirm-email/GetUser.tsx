import { createClient } from "@/utils/supabase/client";

interface User {
    id: string;
    email: string;
    // Adicione outras propriedades necessárias aqui
}

// Função para buscar um usuário por email no Supabase
export default async function GetUser(email: string) {
    const supabase = createClient();
    // Realiza a consulta
    const { data, error } = await supabase
        .from('public/user_profiles')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }

    return data
}

