export const toSlug = (text: string): string => {
    return text
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')   // Remove non-alphanumeric chars
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/-+/g, '-');           // Replace multiple hyphens with one
}