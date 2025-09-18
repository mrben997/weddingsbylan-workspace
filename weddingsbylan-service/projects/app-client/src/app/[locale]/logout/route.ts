import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = cookies()
    cookieStore.delete('edit-mode')
    return NextResponse.json({});
}