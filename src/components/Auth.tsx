import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Lock } from 'lucide-react';

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
                    <div className="size-8 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                            <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">SaaS Platform</h2>
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
