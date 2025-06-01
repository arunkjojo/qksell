export const toCapitalize = (str: string) => {
    str.toLowerCase();
    if (!str) return str;
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');;
}