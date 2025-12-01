export interface KeyPair {
    publicKey: string;
    privateKey: string;
}

// --- Helpers para Conversão de Formatos ---

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function formatPEM(keyData: string, type: 'PUBLIC' | 'PRIVATE'): string {
    const chunks = keyData.match(/.{1,64}/g) || [];
    return `-----BEGIN ${type} KEY-----\n${chunks.join('\n')}\n-----END ${type} KEY-----`;
}

function parsePEM(pem: string): ArrayBuffer {
    const base64 = pem
        .replace(/-----BEGIN (PUBLIC|PRIVATE) KEY-----/g, '')
        .replace(/-----END (PUBLIC|PRIVATE) KEY-----/g, '')
        .replace(/\n/g, '')
        .trim();
    return base64ToArrayBuffer(base64);
}

// --- Funções Principais ---

export async function generateKeyPair(): Promise<KeyPair> {
    // Geramos uma chave RSA-OAEP (Criptografia)
    // Nota: Para fins didáticos, usaremos os mesmos parâmetros matemáticos para assinar,
    // reimportando a chave como RSASSA-PKCS1-v1_5 quando necessário.
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048, // 2048 bits é o padrão seguro atual
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true, // Extraível (para podermos mostrar em PEM)
        ["encrypt", "decrypt"]
    );

    const publicKeyBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKeyBuffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    return {
        publicKey: formatPEM(arrayBufferToBase64(publicKeyBuffer), 'PUBLIC'),
        privateKey: formatPEM(arrayBufferToBase64(privateKeyBuffer), 'PRIVATE'),
    };
}

export async function encryptMessage(message: string, publicKeyPEM: string): Promise<string> {
    try {
        const keyData = parsePEM(publicKeyPEM);
        const key = await window.crypto.subtle.importKey(
            "spki",
            keyData,
            { name: "RSA-OAEP", hash: "SHA-256" },
            false,
            ["encrypt"]
        );

        const encoder = new TextEncoder();
        const data = encoder.encode(message);

        const encryptedBuffer = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            key,
            data
        );

        return arrayBufferToBase64(encryptedBuffer);
    } catch (error) {
        console.error("Erro na criptografia:", error);
        return "[ERRO: Falha ao criptografar. Mensagem muito longa para RSA?]";
    }
}

export async function decryptMessage(encryptedMessageBase64: string, privateKeyPEM: string): Promise<string> {
    try {
        const keyData = parsePEM(privateKeyPEM);
        const key = await window.crypto.subtle.importKey(
            "pkcs8",
            keyData,
            { name: "RSA-OAEP", hash: "SHA-256" },
            false,
            ["decrypt"]
        );

        const encryptedData = base64ToArrayBuffer(encryptedMessageBase64);

        const decryptedBuffer = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            key,
            encryptedData
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedBuffer);
    } catch (error) {
        console.error("Erro na descriptografia:", error);
        return "[FALHA NA DESCRIPTOGRAFIA - Chave Incorreta]";
    }
}

export async function signMessage(message: string, privateKeyPEM: string): Promise<string> {
    try {
        // Reimportamos a chave privada como RSASSA-PKCS1-v1_5 para assinatura
        const keyData = parsePEM(privateKeyPEM);
        const key = await window.crypto.subtle.importKey(
            "pkcs8",
            keyData,
            { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const encoder = new TextEncoder();
        const data = encoder.encode(message);

        const signatureBuffer = await window.crypto.subtle.sign(
            "RSASSA-PKCS1-v1_5",
            key,
            data
        );

        return arrayBufferToBase64(signatureBuffer);
    } catch (error) {
        console.error("Erro na assinatura:", error);
        return "[ERRO AO ASSINAR]";
    }
}

export async function verifySignature(message: string, signatureBase64: string, publicKeyPEM: string): Promise<boolean> {
    try {
        // Reimportamos a chave pública como RSASSA-PKCS1-v1_5 para verificação
        const keyData = parsePEM(publicKeyPEM);
        const key = await window.crypto.subtle.importKey(
            "spki",
            keyData,
            { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
            false,
            ["verify"]
        );

        const signatureData = base64ToArrayBuffer(signatureBase64);
        const encoder = new TextEncoder();
        const data = encoder.encode(message);

        return await window.crypto.subtle.verify(
            "RSASSA-PKCS1-v1_5",
            key,
            signatureData,
            data
        );
    } catch (error) {
        console.error("Erro na verificação:", error);
        return false;
    }
}

export function formatKeyForDisplay(key: string, length: number = 40): string {
    const rawKey = key
        .replace(/-----BEGIN (PUBLIC|PRIVATE) KEY-----/g, '')
        .replace(/-----END (PUBLIC|PRIVATE) KEY-----/g, '')
        .replace(/\n/g, '')
        .trim();

    if (rawKey.length <= length) return rawKey;
    return `${rawKey.substring(0, length)}...`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy:', error);
        return false;
    }
}
