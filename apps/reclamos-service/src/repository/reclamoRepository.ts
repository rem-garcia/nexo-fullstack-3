import { ReclamoType } from "@nexo/schemas";
import { supabase } from "../lib/supabase";
import { toSnakeCase } from "../lib/toSnakeCase";

// Metodo para crear reclamos
export const createReclamo = async (payloadReclamo: ReclamoType) => {

    const insertData = toSnakeCase(payloadReclamo);

    const { error } = await supabase
        .from("reclamo")
        .insert(insertData)
        .select("id")
        .limit(1);
        
    if(error) {
        throw error;
    }
};