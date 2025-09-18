import { ILanguage, TLanguage } from "./types";
import en from './data/en.json'
import vn from './data/vn.json'

const translations: Record<TLanguage, ILanguage> = {
    en, vn
}

export const getTranslation = (locale?: TLanguage | string) => {
    const t = translations[locale as keyof typeof translations] || translations.vn;
    return t;
};

export const getTranslationValue = (locale: TLanguage | undefined, key: keyof ILanguage) => {
    const data = getTranslation(locale)
    return data[key];
};