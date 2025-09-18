import { useRouter } from "next/router";
import { getTranslation } from "./helper";
import { ILanguage } from "./types";

export const useTranslation = () => {
    const { query } = useRouter();
    const locale = Array.isArray(query["locale"]) ? query["locale"][0] : query["locale"]
    return getTranslation(locale as any);
};

export const useTranslationValue = (key: keyof ILanguage) => {
    const data = useTranslation()
    return data[key];
};