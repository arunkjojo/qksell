export function setCookie(name: string, value: string, days: number = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration time
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${name}=${value};${expires};path=/`;
}