import { createClient } from "@supabase/supabase-js";

// Este createClient es para crear clientes que no son del servicio Auth de Supabase
export const createClientV2 = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );
};
