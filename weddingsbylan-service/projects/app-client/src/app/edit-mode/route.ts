import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = cookies()
    cookieStore.set('edit-mode', 'true')
    
    // Extract locale from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
    const locale = pathSegments[0] || 'vn'; // First segment is locale, default to 'vn'
    
    const params = new URLSearchParams(request.url.split('?')[1]);
    //TODO:
    // return NextResponse.redirect(new URL('/?locale=' + locale, request.url));
    const origin = request.headers.get('referer') || request.headers.get('host');
    const fullOrigin = origin ? (origin.startsWith('http') ? origin : `http://${origin}`) : '';
    return NextResponse.redirect(new URL(`/${locale}/`, fullOrigin ?? ""));
}