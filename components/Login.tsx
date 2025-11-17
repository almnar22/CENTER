import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path d="M12.001 2.003c.87 0 1.704.246 2.404.69l6.304 3.998c1.4  .885 1.4 2.94 0 3.824l-6.304 3.998a4.503 4.503 0 0 1-4.808 0l-6.304-3.998a2.25 2.25 0 0 1 0-3.824l6.304-3.998a4.503 4.503 0 0 1 2.404-.69Zm-9.19 8.293L9.6 13.094a6.004 6.004 0 0 0 4.803 0l6.789-4.298-6.305-3.998a4.503 4.503 0 0 1-4.808 0l-6.304 3.998ZM2.81 13.801l6.305 3.998a4.503 4.503 0 0 0 4.808 0l6.304-3.998-6.789-4.298a6.004 6.004 0 0 1-4.803 0L2.81 13.8Z" />
  </svg>
);

export const Login: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(username, password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
            <div className="w-full max-w-md">
                <div className="bg-[var(--color-card)] p-4 rounded-lg shadow-md border-t-4 border-[var(--color-primary)] text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                        <DiamondIcon className="text-[var(--color-primary)]" />
                        <h1 className="text-2xl font-bold text-[var(--color-primary)]">نظام المركز الأوروبي</h1>
                        <DiamondIcon className="text-[var(--color-secondary)]" />
                    </div>
                </div>
                <div className="bg-[var(--color-card)] shadow-2xl rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-[var(--color-text-base)] mb-2">👤 تسجيل الدخول</h2>
                    <p className="text-center text-[var(--color-text-muted)] mb-6">مرحباً بك، يرجى إدخال بياناتك للوصول للنظام.</p>
                    
                    {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[var(--color-text-base)] font-semibold mb-2" htmlFor="username">
                                اسم المستخدم
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition bg-[var(--color-card)] text-[var(--color-text-base)]"
                                placeholder="e.g., admin"
                            />
                        </div>
                        <div>
                            <label className="block text-[var(--color-text-base)] font-semibold mb-2" htmlFor="password">
                                كلمة المرور
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition bg-[var(--color-card)] text-[var(--color-text-base)]"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[var(--color-secondary)] text-[var(--color-primary-text)] font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-secondary-hover)] transition-colors duration-300 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
