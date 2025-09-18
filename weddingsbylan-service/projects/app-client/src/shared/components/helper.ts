export function fixHashPosition(url: string) {
    if (!url || url === "#") {
        return "#"; // Luôn trả về "#" nếu URL trống hoặc là "#"
    }

    const [base, hash] = url.split("#");

    if (hash && hash.includes("?")) {
        const cleanedHash = hash.replace("?", "");

        // Thêm cleanedHash vào base với ký tự phù hợp giữa "?" hoặc "&"
        return base.includes("?")
            ? `${base}&${cleanedHash}`
            : `${base}?${cleanedHash}`;
    }

    return url;
}
export function addLocaleToHref(href: string, locale?: string) {
    if (!locale) return href
    if (href == "#") href = ""
    const hasQuery = href.includes("?");

    if (href.includes("locale=")) {
        return href.replace(/(locale=)[^&]*/, `$1${locale}`);
    } else {
        return hasQuery ? `${href}&locale=${locale}` : `${href}?locale=${locale}`;
    }
}