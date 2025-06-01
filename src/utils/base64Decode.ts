export function base64Decode(encoded: string): string {
    return atob(encoded);
}