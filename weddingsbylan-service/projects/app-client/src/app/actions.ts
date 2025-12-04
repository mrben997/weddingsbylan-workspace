'use server'
import { cookies } from 'next/headers'
export async function setCookie(name: string, value: string) {
    'use server'
    cookies().set(name, value)
}