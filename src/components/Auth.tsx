import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Lock } from 'lucide-react';
import logo from '../assets/logoeiron.svg';

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
            } else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (signUpError) throw signUpError;
                alert('Account created! You can now log in.');
                setIsLogin(true); // Switch to login view
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setLoading(false);
        }
    };

    const handleGitHubLogin = async () => {
        try {
            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider: 'github',
            });
            if (oauthError) throw oauthError;
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen mesh-gradient flex flex-col font-display selection:bg-primary/30">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 lg:px-10 py-4 bg-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <div className="size-8 flex items-center justify-center">
                        <img src={logo} alt="Logo" className="size-6" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">SubManager</h2>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-slate-500 hidden sm:inline-block">
                        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                    </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 border border-slate-700 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
                    >
                        <span>{isLogin ? "Registrarse" : "Entrar"}</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Auth Card */}
                    <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6">
                        <div className="text-center flex flex-col gap-2">
                            <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
                                {isLogin ? "Bienvenido de nuevo" : "Crear una cuenta"}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">
                                {isLogin ? "Ingresa tus credenciales" : "Comienza a gestionar tus suscripciones"}
                            </p>
                        </div>

                        {/* Social Button */}
                        <button
                            onClick={handleGitHubLogin}
                            className="flex w-full items-center justify-center gap-3 rounded-xl h-12 border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-base font-medium transition-all group"
                        >
                            <svg className="size-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                            </svg>
                            <span>{isLogin ? "Entrar" : "Registrarse"} con GitHub</span>
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                            <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase tracking-widest font-medium">o con email</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        </div>

                        {/* Registration/Login Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {!isLogin && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Nombre Completo</label>
                                    <input
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-base transition-all"
                                        placeholder="Ej. Juan Pérez"
                                        type="text"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Email</label>
                                <input
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-base transition-all"
                                    placeholder="nombre@empresa.com"
                                    type="email"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Contraseña</label>
                                <input
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 p-[15px] text-base transition-all"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>

                            <div className="mt-2">
                                <button
                                    disabled={loading}
                                    className="flex w-full cursor-pointer items-center justify-center rounded-xl h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    type="submit"
                                >
                                    {loading ? (
                                        <Loader2 className="size-6 animate-spin" />
                                    ) : (
                                        <span className="truncate">{isLogin ? "Iniciar sesión" : "Crear cuenta"}</span>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-2">
                            <p className="text-slate-500 text-sm">
                                {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-primary font-semibold hover:underline decoration-2 underline-offset-4"
                                >
                                    {isLogin ? "Registrarse" : "Entrar"}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Trust Badges / Footer Info */}
                    <div className="mt-8 flex flex-col items-center gap-4 text-slate-500 text-xs text-center opacity-60">
                        <div className="flex items-center gap-2">
                            <Lock className="size-3" />
                            <span>Conexión cifrada SSL de 256 bits</span>
                        </div>
                        <div className="flex gap-4">
                            <a className="hover:text-slate-300 transition-colors" href="#">Términos de servicio</a>
                            <a className="hover:text-slate-300 transition-colors" href="#">Privacidad</a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};
