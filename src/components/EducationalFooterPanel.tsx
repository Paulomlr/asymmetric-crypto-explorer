import { BookOpen, Globe, Cpu, Scale, ShieldAlert, Sparkles, Info } from 'lucide-react';

interface Section {
    title: string;
    icon: React.ReactElement;
    content: string;
}

const sections: Section[] = [
    {
        title: "História da Criptografia",
        icon: <BookOpen className="w-5 h-5 text-accent-blue" />,
        content: "Da cifra de César usada por Roma até o revolucionário RSA de 1977, a criptografia evoluiu de simples substituições para matemática complexa baseada em números primos gigantes.",
    },
    {
        title: "Onde Isso é Usado no Mundo Real",
        icon: <Globe className="w-5 h-5 text-accent-green" />,
        content: "HTTPS protege suas compras online, WhatsApp usa criptografia ponta-a-ponta, bancos movimentam trilhões com segurança, certificados digitais validam identidades, e blockchain revoluciona contratos.",
    },
    {
        title: "Algoritmos Modernos",
        icon: <Cpu className="w-5 h-5 text-accent-amber" />,
        content: "RSA usa fatoração de números primos, ECC oferece mesma segurança com chaves menores, Ed25519 é ultra-rápido para assinaturas digitais. Todos matematicamente impossíveis de quebrar na prática.",
    },
    {
        title: "Simétrica vs Assimétrica",
        icon: <Scale className="w-5 h-5 text-purple-500" />,
        content: "Simétrica (AES) é rápida mas exige compartilhar a chave. Assimétrica (RSA) resolve esse problema com duas chaves, mas é mais lenta. Na prática, usa-se RSA para trocar uma chave AES!",
    },
    {
        title: "Ataques e Segurança",
        icon: <ShieldAlert className="w-5 h-5 text-accent-red" />,
        content: "Brute force levaria bilhões de anos. Man-in-the-middle é bloqueado por certificados. Engenharia social continua sendo o elo mais fraco. Computadores quânticos são a próxima fronteira.",
    },
    {
        title: "Curiosidades",
        icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
        content: "Uma chave RSA de 2048 bits tem mais possibilidades que átomos no universo! A NSA investe bilhões em quebrar criptografia. Seu navegador faz milhares de operações RSA por dia sem você perceber.",
    },
];

export default function EducationalFooterPanel() {
    return (
        <div className="mb-4 p-10 bg-background-secondary border border-white/5 rounded-2xl shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 bg-background-elevated rounded-lg border border-white/10">
                    <Info className="w-6 h-6 text-accent-blue" />
                </div>
                <h2 className="text-3xl font-bold text-text-primary">
                    Aprenda Mais Sobre Criptografia Assimétrica
                </h2>
            </div>

            <p className="text-text-secondary text-lg leading-relaxed">
                Agora que você experimentou o processo, vamos aprofundar nos conceitos,
                entender o contexto histórico e ver como essa tecnologia molda o mundo digital.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className="p-6 bg-background-elevated rounded-xl border border-white/5 
              hover:border-white/10 transition-all duration-300 hover:shadow-lg 
              hover:shadow-accent-blue/5 flex gap-4 group"
                    >
                        <div className="p-3 bg-background-secondary border border-white/10 rounded-lg 
              h-fit group-hover:scale-110 transition-transform duration-300">
                            {section.icon}
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-lg font-bold text-text-primary">
                                {section.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-accent-blue/10 to-purple-500/10 
        border border-accent-blue/20 rounded-xl">
                <h3 className="text-lg font-bold text-accent-blue mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Por Que Isso Importa?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    A criptografia assimétrica é a base da confiança digital. Sem ela, não haveria
                    comércio eletrônico seguro, privacidade online ou autenticação confiável. Cada
                    vez que você vê o cadeado no navegador, está vendo RSA ou ECC em ação, protegendo
                    seus dados de bilhões de possíveis ataques.
                </p>
            </div>
        </div>
    );
}
