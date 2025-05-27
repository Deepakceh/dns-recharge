import pako from "pako";

export function decoder(encryptData: string): string {
    if (!encryptData) {
        return "";
    }

    try {
        const binaryString = window.atob(encryptData);
        const byteArray = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        const data: ArrayBuffer = byteArray.buffer;
        const array: Uint8Array = pako.inflate(data);

        let strData = '';
        const chunkSize = 8 * 1024;
        let i: number;

        for (i = 0; i < array.length / chunkSize; i++) {
            strData += String.fromCharCode(...array.slice(i * chunkSize, (i + 1) * chunkSize));
        }

        strData += String.fromCharCode(...array.slice(i * chunkSize));

        return decodeURIComponent(escape(strData));
    } catch (error) {
        console.error("Decoding failed:", error);
        return "";
    }
}
