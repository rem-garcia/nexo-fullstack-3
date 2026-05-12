import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const registerSchema: z.ZodObject<{
    full_name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        super_admin: "super_admin";
        admin: "admin";
        coordinador: "coordinador";
        tecnico: "tecnico";
        cliente: "cliente";
    }>;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
//# sourceMappingURL=auth.schema.d.ts.map