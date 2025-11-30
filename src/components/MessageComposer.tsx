import React, { useState } from 'react';
import type { User } from '../types';
import { Send, Lock, Edit3, ArrowRight } from 'lucide-react';

interface MessageComposerProps {
    users: User[];
    onMessageEncrypt: (senderId: string, recipientId: string, message: string) => void;
    disabled?: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ users, onMessageEncrypt, disabled }) => {
    const [senderId, setSenderId] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [message, setMessage] = useState('');

    const handleEncrypt = () => {
        if (senderId && recipientId && message.trim()) {
            onMessageEncrypt(senderId, recipientId, message.trim());
            setMessage('');
        }
    };

    //const sender = users.find(u => u.id === senderId);
    const recipient = users.find(u => u.id === recipientId);

    return (
        <div className="bg-background-secondary rounded-xl border border-white/5 shadow-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                <div className="p-2 bg-accent-amber/10 rounded-lg text-accent-amber">
                    <Edit3 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Compor Mensagem</h3>
            </div>

            <div className="p-6 space-y-6 flex-1">
                {/* User Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary block">De (Remetente)</label>
                        <div className="relative">
                            <select
                                value={senderId}
                                onChange={(e) => setSenderId(e.target.value)}
                                disabled={disabled}
                                className="w-full bg-background-tertiary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none appearance-none transition-all"
                            >
                                <option value="">Selecione...</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                <ArrowRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary block">Para (Destinatário)</label>
                        <div className="relative">
                            <select
                                value={recipientId}
                                onChange={(e) => setRecipientId(e.target.value)}
                                disabled={disabled || !senderId}
                                className="w-full bg-background-tertiary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none appearance-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="">Selecione...</option>
                                {users.filter(u => u.id !== senderId).map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                <ArrowRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Banner */}
                {recipientId && (
                    <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-3 flex items-start gap-3">
                        <Lock className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-text-secondary leading-relaxed">
                            A mensagem será criptografada com a <strong className="text-accent-blue">chave pública</strong> de {recipient?.name}.
                        </p>
                    </div>
                )}

                {/* Message Input */}
                <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium text-text-secondary block">Mensagem</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua mensagem secreta aqui..."
                        rows={4}
                        disabled={disabled || !recipientId}
                        className="w-full bg-background-tertiary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-text-muted/50"
                    />
                </div>

                <button
                    onClick={handleEncrypt}
                    disabled={disabled || !senderId || !recipientId || !message.trim()}
                    className="w-full bg-accent-blue hover:bg-accent-blue-hover text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-accent-blue/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                    <Lock className="w-4 h-4" />
                    <span>Criptografar e Enviar</span>
                    <Send className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    );
};

export default MessageComposer;
