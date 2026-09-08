import dns from 'dns/promises';

/**
 * Blocks the server from being made to fetch internal/private network
 * targets (SSRF) via user-submitted URLs — e.g. cloud metadata endpoints
 * (169.254.169.254), localhost, or RFC1918 ranges reachable from inside the
 * hosting environment.
 *
 * This checks the resolved IP before the initial request. It does not
 * re-validate redirect targets — a URL that 302s to an internal address
 * after passing this check is a known residual risk.
 */

function isPrivateIPv4(ip: string): boolean {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;
    const [a, b] = parts;

    if (a === 127) return true; // loopback
    if (a === 10) return true; // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    if (a === 169 && b === 254) return true; // link-local incl. cloud metadata
    if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
    if (a === 0) return true; // 0.0.0.0/8
    return false;
}

function isPrivateIPv6(ip: string): boolean {
    const lower = ip.toLowerCase();
    if (lower === '::1') return true; // loopback
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // fc00::/7 ULA
    if (lower.startsWith('fe80')) return true; // fe80::/10 link-local

    // IPv4-mapped IPv6 (::ffff:a.b.c.d) — check the embedded IPv4.
    const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIPv4(mapped[1]);

    return false;
}

export function isPrivateIp(ip: string): boolean {
    return ip.includes(':') ? isPrivateIPv6(ip) : isPrivateIPv4(ip);
}

/**
 * Throws if `urlString` is not http(s), or resolves to a private/internal
 * address. Safe to call before any server-side fetch of a user-supplied URL.
 */
export async function assertPublicHttpUrl(urlString: string): Promise<void> {
    const url = new URL(urlString);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Only http/https URLs are allowed');
    }

    let addresses: string[];
    try {
        const results = await dns.lookup(url.hostname, { all: true });
        addresses = results.map((r) => r.address);
    } catch {
        throw new Error('Could not resolve host');
    }

    if (addresses.length === 0 || addresses.some(isPrivateIp)) {
        throw new Error('URL resolves to a disallowed private/internal address');
    }
}
