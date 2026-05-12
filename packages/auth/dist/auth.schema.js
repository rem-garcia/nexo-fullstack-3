"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('El correo electrónico no es válido'),
    password: zod_1.z
        .string()
        .min(8, 'La contraseña debe tener al menos 6 caracteres')
});
exports.registerSchema = zod_1.z.object({
    full_name: zod_1.z
        .string()
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: zod_1.z
        .string()
        .email('El correo electrónico no es válido'),
    password: zod_1.z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
    role: zod_1.z.enum([
        'super_admin',
        'admin',
        'coordinador',
        'tecnico',
        'cliente'
    ])
});
//# sourceMappingURL=auth.schema.js.map