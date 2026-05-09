import * as CryptoJS from 'crypto-js';

export function decryptPage(data: string, pwd: string) {
    let code;  
    code = CryptoJS.AES.decrypt(data, pwd);
    let decryptedMessage = '';

    if (code.sigBytes < 0) return null;
    decryptedMessage = code.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}