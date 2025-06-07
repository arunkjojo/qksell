export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Returns the current domain (hostname)
export function getCurrentDomain(): string {
    return window.location.hostname;
}

// Enhanced getCookie: returns cookie only if domain matches (if domain is provided)
export function getCookieByDomain(name: string, domain?: string): string | null {
    const currentDomain = window.location.hostname;
    if (domain && domain !== currentDomain) {
        return null;
    }
    return getCookie(name);
}