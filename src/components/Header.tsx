import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="bg-background-secondary border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-accent-blue/20">
                    <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                        Criptografia Assimétrica
                    </h1>
                    <p className="text-text-secondary text-sm">
                        Aprenda como funciona a criptografia de chave pública na prática
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
