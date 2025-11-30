import React, { useEffect, useState } from 'react';
import type { AppStep } from '../types';
import { Info, Shield, Key, Lock, Send, CheckCircle2, X } from 'lucide-react';

// --- Content Component ---
interface EducationalPanelContentProps {
    currentStep: AppStep;
}

const EducationalPanelContent: React.FC<EducationalPanelContentProps> = ({ currentStep }) => {
    const getEducationalContent = () => {
        switch (currentStep) {
            case 'initial':
                return {
                    title: 'Bem-vindo ao Tutorial',
                    icon: <Shield className="w-6 h-6 text-accent-blue" />,
                    content: (
                        <div className="space-y-4">
                            <p className="text-text-secondary">
                                Neste tutorial interativo, você vai aprender como funciona a <strong className="text-text-primary">criptografia assimétrica</strong>,
                                também conhecida como criptografia de chave pública.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="bg-background-elevated p-4 rounded-lg border border-white/5">
                                    <h4 className="text-accent-blue font-bold mb-2 flex items-center gap-2">
                                        <Key className="w-4 h-4" /> Chave Pública
                                    </h4>
                                    <p className="text-sm text-text-muted">Compartilhada com todos. Usada para <strong>criptografar</strong>.</p>
                                </div>
                                <div className="bg-background-elevated p-4 rounded-lg border border-white/5">
                                    <h4 className="text-accent-red font-bold mb-2 flex items-center gap-2">
                                        <Lock className="w-4 h-4" /> Chave Privada
                                    </h4>
                                    <p className="text-sm text-text-muted">Mantida em segredo. Usada para <strong>descriptografar</strong>.</p>
                                </div>
                                <div className="bg-background-elevated p-4 rounded-lg border border-white/5">
                                    <h4 className="text-accent-green font-bold mb-2 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> Segurança
                                    </h4>
                                    <p className="text-sm text-text-muted">O que uma chave tranca, só a outra destranca!</p>
                                </div>
                            </div>
                        </div>
                    ),
                };

            case 'keys-generated':
                return {
                    title: 'Chaves Geradas',
                    icon: <Key className="w-6 h-6 text-accent-green" />,
                    content: (
                        <div className="space-y-4">
                            <p className="text-text-secondary">
                                Alice e Bob agora têm seus próprios pares de chaves.
                            </p>
                            <div className="bg-accent-blue/10 border border-accent-blue/20 p-4 rounded-lg flex gap-3">
                                <Info className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-text-secondary">
                                    <strong className="text-accent-blue block mb-1">Como funciona?</strong>
                                    Se Alice quer enviar uma mensagem secreta para Bob, ela usa a <strong>chave pública de Bob</strong> para criptografar.
                                    Só Bob poderá ler usando sua <strong>chave privada</strong>.
                                </div>
                            </div>
                        </div>
                    ),
                };

            case 'sender-selected':
            case 'message-written':
                return {
                    title: 'Compondo a Mensagem',
                    icon: <Send className="w-6 h-6 text-accent-blue" />,
                    content: (
                        <div className="space-y-4">
                            <p className="text-text-secondary">
                                O sistema usará a <strong>chave pública do destinatário</strong> para transformar seu texto.
                            </p>
                            <div className="bg-background-elevated p-4 rounded-lg border border-white/5">
                                <h4 className="text-text-primary font-bold mb-2">O Processo:</h4>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-text-muted">
                                    <li>Você escreve a mensagem legível (texto claro)</li>
                                    <li>O algoritmo aplica a chave pública do destinatário</li>
                                    <li>O resultado é um texto cifrado ilegível</li>
                                </ol>
                            </div>
                        </div>
                    ),
                };

            case 'message-encrypted':
            case 'message-sent':
                return {
                    title: 'Mensagem Criptografada',
                    icon: <Lock className="w-6 h-6 text-accent-amber" />,
                    content: (
                        <div className="space-y-4">
                            <p className="text-text-secondary">
                                A mensagem foi transformada em texto cifrado. Agora, nem mesmo o remetente consegue lê-la!
                            </p>
                            <div className="bg-accent-amber/10 border border-accent-amber/20 p-4 rounded-lg">
                                <h4 className="text-accent-amber font-bold mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Por que é seguro?
                                </h4>
                                <p className="text-sm text-text-secondary">
                                    Mesmo se um hacker interceptar essa mensagem no caminho, ele só verá o código embaralhado.
                                    Sem a chave privada do destinatário, é matematicamente impossível reverter o processo.
                                </p>
                            </div>
                        </div>
                    ),
                };

            case 'message-decrypted':
                return {
                    title: 'Sucesso!',
                    icon: <CheckCircle2 className="w-6 h-6 text-accent-green" />,
                    content: (
                        <div className="space-y-4">
                            <p className="text-text-secondary">
                                O destinatário usou sua <strong>chave privada</strong> para recuperar a mensagem original.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-background-elevated p-4 rounded-lg border border-white/5">
                                    <h4 className="text-text-primary font-bold mb-2">Resumo:</h4>
                                    <ul className="space-y-2 text-sm text-text-muted">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-accent-green" /> Chave Pública criptografou</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-accent-green" /> Chave Privada descriptografou</li>
                                    </ul>
                                </div>
                                <div className="bg-background-elevated p-4 rounded-lg border border-white/5">
                                    <h4 className="text-text-primary font-bold mb-2">Aplicações Reais:</h4>
                                    <ul className="space-y-2 text-sm text-text-muted">
                                        <li>• HTTPS (Cadeado do navegador)</li>
                                        <li>• WhatsApp (Ponta-a-ponta)</li>
                                        <li>• Assinaturas Digitais</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ),
                };

            default:
                return {
                    title: 'Tutorial',
                    icon: <Info className="w-6 h-6 text-text-primary" />,
                    content: <p>Acompanhe o processo passo a passo!</p>,
                };
        }
    };

    const { title, icon, content } = getEducationalContent();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 bg-background-elevated rounded-lg border border-white/10">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-text-primary">{title}</h2>
            </div>
            <div className="text-text-secondary leading-relaxed">
                {content}
            </div>
        </div>
    );
};

// --- Modal Component ---
interface EducationalModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStep: AppStep;
}

const EducationalModal: React.FC<EducationalModalProps> = ({ isOpen, onClose, currentStep }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`
          relative w-full max-w-2xl bg-background-secondary rounded-2xl border border-white/10 shadow-2xl 
          transform transition-all duration-300 p-8
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <EducationalPanelContent currentStep={currentStep} />

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-lg font-medium transition-colors shadow-lg shadow-accent-blue/20"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EducationalModal;
