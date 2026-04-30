"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const supabase_1 = require("@nexo/supabase");
class AuthService {
    // ── REGISTRO ──────────────────────────────────
    static async register(credentials) {
        const supabase = await (0, supabase_1.createServerClient)();
        const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                data: {
                    full_name: credentials.full_name,
                    role: credentials.role
                }
            }
        });
        if (error) {
            return { user: null, error: error.message };
        }
        return {
            user: data.user,
            error: null
        };
    }
    // ── LOGIN ─────────────────────────────────────
    static async login(credentials) {
        const supabase = await (0, supabase_1.createServerClient)();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        });
        if (error) {
            return { user: null, error: error.message };
        }
        return {
            user: data.user,
            error: null
        };
    }
    // ── LOGOUT ────────────────────────────────────
    static async logout() {
        const supabase = await (0, supabase_1.createServerClient)();
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { error: error.message };
        }
        return { error: null };
    }
    // ── OBTENER USUARIO ACTUAL ────────────────────
    static async getUser() {
        const supabase = await (0, supabase_1.createServerClient)();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user)
            return null;
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        return profile;
    }
    // ── OBTENER ROL DEL USUARIO ───────────────────
    static async getRole() {
        var _a;
        const profile = await AuthService.getUser();
        return (_a = profile === null || profile === void 0 ? void 0 : profile.role) !== null && _a !== void 0 ? _a : null;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map