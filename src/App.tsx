import { useState, useEffect } from 'react';
import type { User, Message, AppStep, StepInfo } from './types';
import { generateKeyPair, encryptMessage, decryptMessage } from './utils/crypto';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import UserCard from './components/UserCard';
import MessageComposer from './components/MessageComposer';
import ChatDisplay from './components/ChatDisplay';
import EducationalModal from './components/EducationalPanel';
import { Key } from 'lucide-react';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<AppStep>('initial');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stepsWithModal: AppStep[] = [
      'keys-generated',
      'sender-selected',
      'message-written',
      'message-encrypted',
      'message-sent',
      'message-decrypted'
    ];

    if (stepsWithModal.includes(currentStep)) {
      setIsModalOpen(true);
    }
  }, [currentStep]);

  const generateKeys = () => {
    const aliceKeys = generateKeyPair();
    const bobKeys = generateKeyPair();

    const newUsers: User[] = [
      {
        id: 'alice',
        name: 'Alice',
        publicKey: aliceKeys.publicKey,
        privateKey: aliceKeys.privateKey,
        secret: aliceKeys._secret,
        color: '#3B82F6', // Blue
      },
      {
        id: 'bob',
        name: 'Bob',
        publicKey: bobKeys.publicKey,
        privateKey: bobKeys.privateKey,
        secret: bobKeys._secret,
        color: '#10B981', // Green
      },
    ];

    setUsers(newUsers);
    setCurrentStep('keys-generated');
  };

  const handleMessageEncrypt = (senderId: string, recipientId: string, plainText: string) => {
    const recipient = users.find(u => u.id === recipientId);
    if (!recipient) return;

    const encryptedText = encryptMessage(plainText, recipient.publicKey, recipient.secret);

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId,
      recipientId,
      plainText,
      encryptedText,
      isDecrypted: false,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentStep('message-sent');
  };

  const handleDecrypt = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const recipient = users.find(u => u.id === msg.recipientId);
          if (recipient) {
            const decrypted = decryptMessage(msg.encryptedText, recipient.privateKey, recipient.secret);
            return { ...msg, isDecrypted: true, plainText: decrypted };
          }
        }
        return msg;
      })
    );
    setCurrentStep('message-decrypted');
  };

  const getSteps = (): StepInfo[] => {
    const stepOrder: AppStep[] = ['initial', 'keys-generated', 'sender-selected', 'message-written', 'message-encrypted', 'message-sent', 'message-decrypted'];
    const currentIndex = stepOrder.indexOf(currentStep);

    return [
      {
        number: 1,
        title: 'Gerar Chaves',
        description: 'Criar pares de chaves',
        isActive: currentStep === 'initial',
        isCompleted: currentIndex > 0,
      },
      {
        number: 2,
        title: 'Visualizar',
        description: 'Pública e Privada',
        isActive: currentStep === 'keys-generated',
        isCompleted: currentIndex > 1,
      },
      {
        number: 3,
        title: 'Compor',
        description: 'Escrever mensagem',
        isActive: currentStep === 'sender-selected' || currentStep === 'message-written',
        isCompleted: currentIndex > 3,
      },
      {
        number: 4,
        title: 'Criptografar',
        description: 'Usar chave pública',
        isActive: currentStep === 'message-encrypted',
        isCompleted: currentIndex > 4,
      },
      {
        number: 5,
        title: 'Enviar',
        description: 'Texto cifrado',
        isActive: currentStep === 'message-sent',
        isCompleted: currentIndex > 5,
      },
      {
        number: 6,
        title: 'Descriptografar',
        description: 'Usar chave privada',
        isActive: currentStep === 'message-decrypted',
        isCompleted: currentIndex > 6,
      },
    ];
  };

  return (
    <div className="min-h-screen bg-background-primary text-text-primary font-sans selection:bg-accent-blue/30">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <StepIndicator steps={getSteps()} />

        {currentStep === 'initial' && (
          <div className="flex justify-center py-12 animate-in fade-in zoom-in duration-500">
            <div className="bg-background-secondary rounded-2xl p-12 max-w-2xl text-center border border-white/5 shadow-2xl shadow-accent-blue/5">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-blue to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent-blue/30 animate-pulse">
                <Key className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-4">Comece Gerando as Chaves</h2>
              <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                Clique no botão abaixo para criar pares de chaves (pública + privada)
                para Alice e Bob. Este é o primeiro passo da criptografia assimétrica!
              </p>
              <button
                onClick={generateKeys}
                className="bg-accent-blue hover:bg-accent-blue-hover text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-accent-blue/20 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-3 mx-auto text-lg"
              >
                <Key className="w-6 h-6" />
                Gerar Chaves para Alice e Bob
              </button>
            </div>
          </div>
        )}

        {users.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <span className="w-8 h-8 bg-background-elevated rounded-lg flex items-center justify-center text-sm font-mono text-text-muted border border-white/10">01</span>
                Usuários e suas Chaves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {users.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                  <span className="w-8 h-8 bg-background-elevated rounded-lg flex items-center justify-center text-sm font-mono text-text-muted border border-white/10">02</span>
                  Interação
                </h2>
                <MessageComposer
                  users={users}
                  onMessageEncrypt={handleMessageEncrypt}
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                  <span className="w-8 h-8 bg-background-elevated rounded-lg flex items-center justify-center text-sm font-mono text-text-muted border border-white/10">03</span>
                  Chat Seguro
                </h2>
                <ChatDisplay
                  messages={messages}
                  users={users}
                  onDecrypt={handleDecrypt}
                />
              </div>
            </div>
          </div>
        )}

        <EducationalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentStep={currentStep}
        />
      </main>
    </div>
  );
}

export default App;
