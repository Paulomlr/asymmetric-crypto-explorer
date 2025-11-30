import React, { useState } from 'react';
import type { User } from '../types';
import { User as UserIcon, Copy, Eye, EyeOff, Key, Lock, Check } from 'lucide-react';
import { copyToClipboard, formatKeyForDisplay } from '../utils/crypto';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [copiedPublic, setCopiedPublic] = useState(false);
    const [copiedPrivate, setCopiedPrivate] = useState(false);

    const handleCopyPublic = async () => {
        const success = await copyToClipboard(user.publicKey);
        if (success) {
            setCopiedPublic(true);
            setTimeout(() => setCopiedPublic(false), 2000);
        }
    };

    const handleCopyPrivate = async () => {
        const success = await copyToClipboard(user.privateKey);
        if (success) {
            setCopiedPrivate(true);
            setTimeout(() => setCopiedPrivate(false), 2000);
        }
    };

    return (
        <div
            className="bg-background-secondary rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ borderColor: `${user.color}40` }}
        >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/5">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: user.color }}
                >
                    <UserIcon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-text-primary">{user.name}</h3>
                    <span className="text-xs font-mono text-text-muted bg-black/20 px-2 py-1 rounded">ID: {user.id}</span>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Public Key Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-accent-blue">
                            <Key className="w-4 h-4" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Chave Pública</span>
                        </div>
                        <button
                            onClick={handleCopyPublic}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-muted hover:text-text-primary"
                            title="Copiar chave pública"
                        >
                            {copiedPublic ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="bg-background-tertiary rounded-lg p-3 border border-white/5 group relative">
                        <code className="text-xs text-accent-blue-hover break-all font-mono leading-relaxed block">
                            {formatKeyForDisplay(user.publicKey, 60)}
                        </code>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background-tertiary pointer-events-none" />
                    </div>
                    <p className="text-xs text-text-muted">
                        Compartilhada com todos. Usada para <strong className="text-accent-blue">criptografar</strong> mensagens.
                    </p>
                </div>

                {/* Private Key Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-accent-red">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Chave Privada</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setShowPrivateKey(!showPrivateKey)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-muted hover:text-text-primary"
                                title={showPrivateKey ? "Ocultar" : "Mostrar"}
                            >
                                {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={handleCopyPrivate}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-muted hover:text-text-primary"
                                title="Copiar chave privada"
                            >
                                {copiedPrivate ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-background-tertiary rounded-lg p-3 border border-white/5 min-h-[3rem] flex items-center">
                        {showPrivateKey ? (
                            <code className="text-xs text-accent-red-soft break-all font-mono leading-relaxed block w-full">
                                {formatKeyForDisplay(user.privateKey, 60)}
                            </code>
                        ) : (
                            <div className="flex items-center gap-2 text-text-muted w-full justify-center opacity-50">
                                <span className="text-xs italic">Conteúdo oculto por segurança</span>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-text-muted">
                        <strong className="text-accent-red">Secreta!</strong> Usada apenas para <strong className="text-accent-red">descriptografar</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
