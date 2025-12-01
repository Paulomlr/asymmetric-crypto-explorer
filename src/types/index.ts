export interface User {
    id: string;
    name: string;
    publicKey: string;
    privateKey: string;
    color: string;
}

export interface Message {
    id: string;
    senderId: string;
    recipientId: string;
    plainText: string;
    encryptedText: string;
    isDecrypted: boolean;
    timestamp: number;
    signature?: string;
    isSignatureVerified?: boolean;
}

export type AppStep =
    | 'initial'
    | 'keys-generated'
    | 'sender-selected'
    | 'message-written'
    | 'message-encrypted'
    | 'message-sent'
    | 'message-decrypted'
    | 'signature-verified';

export interface StepInfo {
    number: number;
    title: string;
    description: string;
    isActive: boolean;
    isCompleted: boolean;
}
