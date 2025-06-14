import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error("Missing encryption key");
}

const ENCRYPTION_KEY_BUFFER = Buffer.from(ENCRYPTION_KEY, 'hex');
if (ENCRYPTION_KEY_BUFFER.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (256 bits) long.");
}

export function encryptBuffer(buffer: Buffer): { encryptedBuffer: Buffer; iv: Buffer } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY_BUFFER, iv);
    const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return { encryptedBuffer, iv };
}


export function decryptBuffer(encryptedBuffer: Buffer, iv: Buffer): Buffer {
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY_BUFFER, iv);
    return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
}