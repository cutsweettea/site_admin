import CryptoJS from 'crypto-js';

export function decryptPage(data: string, pwd: string) {
    let code = CryptoJS.AES.decrypt(data, pwd);
    let decryptedMessage = '';

    if (code.sigBytes < 0) return null;
    try {
        decryptedMessage = code.toString(CryptoJS.enc.Utf8);
    } catch {
        return null;
    }
    return decryptedMessage;
}