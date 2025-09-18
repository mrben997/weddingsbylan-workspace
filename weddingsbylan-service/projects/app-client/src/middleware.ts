// middleware.js (or .ts)
import { NextRequest, NextResponse } from 'next/server';

// Define the characters to replace (case-insensitive)
const replacements = {
    "%5b": "%5B",
    "%5d": "%5D"
};


export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    // Check if the pathname contains _next, static, or api
    if (pathname.includes("_next") || pathname.includes("static") || pathname.includes("api")) {
        if (pathname.includes("_next") || pathname.includes("static")) {
            // If the pathname contains _next or static, perform replacements
            let modifiedPathname = pathname;

            // Apply replacements if any match
            for (const [key, value] of Object.entries(replacements)) {
                modifiedPathname = modifiedPathname.replace(new RegExp(key, "gi"), value);
            }

            // If the pathname was modified, rewrite the URL
            if (modifiedPathname !== pathname) {
                const url = new URL(request.url);
                url.pathname = modifiedPathname;

                // Append searchParams if necessary
                if (searchParams.toString()) {
                    url.search = searchParams.toString();
                }

                return NextResponse.rewrite(url.toString());
            }
        }
        return NextResponse.next();
    }
    const excepts = ["/api", "/static", "/_next", "/public"];
    if (excepts.some(except => pathname.startsWith(except))) {
        return NextResponse.next();
    }

    let response: NextResponse<unknown>
    // Check if path doesn't start with /vn or /en
    if (!pathname.startsWith('/vn') && !pathname.startsWith('/en')) {
        // Add /vn prefix to the path
        request.nextUrl.pathname = `/vn${pathname}`;
        response = NextResponse.redirect(request.nextUrl);
    } else {
        response = NextResponse.next();
    }

    return response
}

export const config = {
    // matcher: ['/((?!api|static|.*\\..*|_next).*)']
    // matcher: ['/((?!api|.*\\..*).*)']

};
