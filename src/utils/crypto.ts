import CryptoJS from 'crypto-js';

export function generateKeyPair() {
    const masterSecret = CryptoJS.lib.WordArray.random(32).toString();

    const publicKeyData = CryptoJS.lib.WordArray.random(32).toString();

    const privateKeyData = CryptoJS.lib.WordArray.random(32).toString();

    const combinedKey = masterSecret;

    return {
        publicKey: formatKey(publicKeyData, 'PUBLIC'),
        privateKey: formatKey(privateKeyData, 'PRIVATE'),
        _secret: combinedKey,
    };
}

function formatKey(key: string, type: 'PUBLIC' | 'PRIVATE'): string {
    const chunks = key.match(/.{1,64}/g) || [];
    return `-----BEGIN ${type} KEY-----\n${chunks.join('\n')}\n-----END ${type} KEY-----`;
}

function extractRawKey(formattedKey: string): string {
    return formattedKey
        .replace(/-----BEGIN (PUBLIC|PRIVATE) KEY-----/g, '')
        .replace(/-----END (PUBLIC|PRIVATE) KEY-----/g, '')
        .replace(/\n/g, '')
        .trim();
}

export function encryptMessage(message: string, _publicKey: string, recipientSecret: string): string {
    const encrypted = CryptoJS.AES.encrypt(message, recipientSecret).toString();
    return encrypted;
}

export function decryptMessage(encryptedMessage: string, _privateKey: string, recipientSecret: string): string {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, recipientSecret);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

        if (!plaintext) {
            return '[DECRYPTION FAILED - Wrong Key]';
        }

        return plaintext;
    } catch (error) {
        return '[DECRYPTION FAILED - Wrong Key]';
    }
}

export function formatKeyForDisplay(key: string, length: number = 40): string {
    const rawKey = extractRawKey(key);
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
