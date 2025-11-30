import React from 'react';
import type { Message, User } from '../types';
import { Lock, Unlock, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChatDisplayProps {
    messages: Message[];
    users: User[];
    onDecrypt: (messageId: string) => void;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages, users, onDecrypt }) => {
    const getUser = (userId: string) => users.find(u => u.id === userId);

    if (messages.length === 0) {
        return (
            <div className="bg-background-secondary rounded-xl border border-white/5 shadow-lg h-full flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                <div className="w-16 h-16 bg-background-tertiary rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <MessageCircle className="w-8 h-8 text-text-muted opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Nenhuma mensagem ainda</h3>
                <p className="text-text-secondary max-w-xs">
                    Envie a primeira mensagem criptografada para iniciar o chat seguro!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-background-secondary rounded-xl border border-white/5 shadow-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue">
                    <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Chat Criptografado</h3>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                {messages.map(message => {
                    const sender = getUser(message.senderId);
                    const recipient = getUser(message.recipientId);

                    return (
                        <div key={message.id} className="bg-background-tertiary rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-md">
                            {/* Message Header */}
                            <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold" style={{ color: sender?.color }}>{sender?.name}</span>
                                    <ArrowRight className="w-3 h-3 text-text-muted" />
                                    <span className="font-bold" style={{ color: recipient?.color }}>{recipient?.name}</span>
                                </div>
                                <span className="text-text-muted font-mono">
                                    {new Date(message.timestamp).toLocaleTimeString('pt-BR')}
                                </span>
                            </div>

                            <div className="p-5 space-y-4">
                                {!message.isDecrypted ? (
                                    <>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-accent-amber text-sm font-semibold">
                                                <Lock className="w-4 h-4" />
                                                <span>Mensagem Criptografada</span>
                                            </div>

                                            <div className="bg-background-primary rounded-lg p-4 border border-accent-amber/20 font-mono text-xs text-accent-amber break-all leading-relaxed shadow-inner">
                                                {message.encryptedText}
                                            </div>

                                            <p className="text-xs text-text-muted">
                                                Criptografada com a <strong className="text-accent-blue">chave pública</strong> de {recipient?.name}.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => onDecrypt(message.id)}
                                            className="w-full bg-accent-green hover:bg-accent-green-hover text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-accent-green/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                                        >
                                            <Unlock className="w-4 h-4" />
                                            <span>{recipient?.name}, Descriptografar</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="flex items-center gap-2 text-accent-green text-sm font-semibold">
                                            <Unlock className="w-4 h-4" />
                                            <span>Mensagem Descriptografada</span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-1">
                                                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">Criptografada</span>
                                                <div className="bg-background-primary rounded-lg p-3 border border-white/5 font-mono text-xs text-text-muted break-all opacity-60">
                                                    {message.encryptedText.substring(0, 50)}...
                                                </div>
                                            </div>

                                            <div className="flex justify-center">
                                                <ArrowRight className="w-5 h-5 text-text-muted rotate-90" />
                                            </div>

                                            <div className="space-y-1">
                                                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">Original</span>
                                                <div className="bg-accent-green/10 rounded-lg p-4 border border-accent-green/30 text-text-primary shadow-sm">
                                                    {message.plainText}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-accent-green bg-accent-green/10 p-2 rounded-lg border border-accent-green/20">
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                            <span>Descriptografada com sucesso usando a <strong>chave privada</strong> de {recipient?.name}.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatDisplay;
