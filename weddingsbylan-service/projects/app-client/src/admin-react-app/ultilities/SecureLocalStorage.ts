import CryptoJS from 'crypto-js';
class SecureLocalStorage {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    // Mã hóa dữ liệu
    // Mã hóa
    public encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    }

    // Giải mã
    public decrypt(encryptedData: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Ghi dữ liệu vào localStorage
    public setItem(key: string, value: string): void {
        const encryptedValue = this.encrypt(value);
        localStorage.setItem(key, encryptedValue);
    }

    // Đọc dữ liệu từ localStorage
    public getItem(key: string): string | null {
        const encryptedValue = localStorage.getItem(key);
        if (!encryptedValue) return null;
        return this.decrypt(encryptedValue);
    }

    // Xóa dữ liệu từ localStorage
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Xóa tất cả dữ liệu
    public clear(): void {
        localStorage.clear();
    }
}

export let secureLocalStorage: SecureLocalStorage | Storage = localStorage

export const InitialStore = () => {
    const bufferTemp = (window as any)._3utkolss
    secureLocalStorage = new SecureLocalStorage(bufferTemp)
}