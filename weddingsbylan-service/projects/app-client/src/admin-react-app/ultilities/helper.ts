import { TLanguage } from "@/locales/types";
import slugify from 'slugify'
type GetMyClassT<C extends Record<any, any>> = C extends Record<infer T1, infer T2> ? T2 : unknown;

export const DictToList = function <TObject extends Record<any, any>>(obj: TObject) {
    return Array.from(Object.values(obj)) as (GetMyClassT<TObject> | undefined)[];
};

export const DictToListNotNull = function <TObject extends Record<any, any>>(obj: TObject) {
    return Array.from(Object.values(obj)).filter(x => x) as GetMyClassT<TObject>[];
};

// export const getLocale = (): TLanguage | undefined => {
//     let search = location.search
//     if (!search) {
//         return undefined
//     } else {
//         const searches = search.slice(1).split("&").map(x => x.split("=")).filter(x => x[0] === 'locale')
//         return searches.length ? searches[0][1] as TLanguage : undefined
//     }
// }
export const getLocale = (): TLanguage | undefined => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(segment => segment.length > 0);
    if (segments.length === 0) {
        return undefined;
    }
    const locale = segments[0];
    return ['vn', 'en'].includes(locale) ? locale as TLanguage : undefined;
}
const accentsMap = new Map([
    // Latin-1 Supplement
    ['À', 'A'], ['Á', 'A'], ['Â', 'A'], ['Ã', 'A'], ['Ä', 'A'], ['Å', 'A'], ['Æ', 'AE'],
    ['Ç', 'C'], ['È', 'E'], ['É', 'E'], ['Ê', 'E'], ['Ë', 'E'], ['Ì', 'I'], ['Í', 'I'],
    ['Î', 'I'], ['Ï', 'I'], ['Ð', 'D'], ['Ñ', 'N'], ['Ò', 'O'], ['Ó', 'O'], ['Ô', 'O'],
    ['Õ', 'O'], ['Ö', 'O'], ['Ø', 'O'], ['Ù', 'U'], ['Ú', 'U'], ['Û', 'U'], ['Ü', 'U'],
    ['Ý', 'Y'], ['Þ', 'TH'], ['ß', 'ss'], ['à', 'a'], ['á', 'a'], ['â', 'a'], ['ã', 'a'],
    ['ä', 'a'], ['å', 'a'], ['æ', 'ae'], ['ç', 'c'], ['è', 'e'], ['é', 'e'], ['ê', 'e'],
    ['ë', 'e'], ['ì', 'i'], ['í', 'i'], ['î', 'i'], ['ï', 'i'], ['ð', 'd'], ['ñ', 'n'],
    ['ò', 'o'], ['ó', 'o'], ['ô', 'o'], ['õ', 'o'], ['ö', 'o'], ['ø', 'o'], ['ù', 'u'],
    ['ú', 'u'], ['û', 'u'], ['ü', 'u'], ['ý', 'y'], ['þ', 'th'], ['ÿ', 'y'],

    // Latin Extended-A
    ['Ā', 'A'], ['Ă', 'A'], ['Ą', 'A'], ['ā', 'a'], ['ă', 'a'], ['ą', 'a'], ['Ć', 'C'],
    ['Ĉ', 'C'], ['Ċ', 'C'], ['Č', 'C'], ['ć', 'c'], ['ĉ', 'c'], ['ċ', 'c'], ['č', 'c'],
    ['Ď', 'D'], ['Đ', 'D'], ['ď', 'd'], ['đ', 'd'], ['Ē', 'E'], ['Ĕ', 'E'], ['Ė', 'E'],
    ['Ę', 'E'], ['Ě', 'E'], ['ē', 'e'], ['ĕ', 'e'], ['ė', 'e'], ['ę', 'e'], ['ě', 'e'],
    ['Ĝ', 'G'], ['Ğ', 'G'], ['Ġ', 'G'], ['Ģ', 'G'], ['ĝ', 'g'], ['ğ', 'g'], ['ġ', 'g'],
    ['ģ', 'g'], ['Ĥ', 'H'], ['Ħ', 'H'], ['ĥ', 'h'], ['ħ', 'h'], ['Ĩ', 'I'], ['Ī', 'I'],
    ['Ĭ', 'I'], ['Į', 'I'], ['İ', 'I'], ['ĩ', 'i'], ['ī', 'i'], ['ĭ', 'i'], ['į', 'i'],
    ['ı', 'i'], ['Ĵ', 'J'], ['ĵ', 'j'], ['Ķ', 'K'], ['ķ', 'k'], ['ĸ', 'k'], ['Ĺ', 'L'],
    ['Ļ', 'L'], ['Ľ', 'L'], ['Ŀ', 'L'], ['Ł', 'L'], ['ĺ', 'l'], ['ļ', 'l'], ['ľ', 'l'],
    ['ŀ', 'l'], ['ł', 'l'], ['Ń', 'N'], ['Ņ', 'N'], ['Ň', 'N'], ['Ŋ', 'N'], ['ń', 'n'],
    ['ņ', 'n'], ['ň', 'n'], ['ŋ', 'n'], ['Ō', 'O'], ['Ŏ', 'O'], ['Ő', 'O'], ['ō', 'o'],
    ['ŏ', 'o'], ['ő', 'o'], ['Ŕ', 'R'], ['Ŗ', 'R'], ['Ř', 'R'], ['ŕ', 'r'], ['ŗ', 'r'],
    ['ř', 'r'], ['Ś', 'S'], ['Ŝ', 'S'], ['Ş', 'S'], ['Š', 'S'], ['ś', 's'], ['ŝ', 's'],
    ['ş', 's'], ['š', 's'], ['Ţ', 'T'], ['Ť', 'T'], ['Ŧ', 'T'], ['ţ', 't'], ['ť', 't'],
    ['ŧ', 't'], ['Ũ', 'U'], ['Ū', 'U'], ['Ŭ', 'U'], ['Ů', 'U'], ['Ű', 'U'], ['Ų', 'U'],
    ['ũ', 'u'], ['ū', 'u'], ['ŭ', 'u'], ['ů', 'u'], ['ű', 'u'], ['ų', 'u'], ['Ŵ', 'W'],
    ['ŵ', 'w'], ['Ŷ', 'Y'], ['ŷ', 'y'], ['Ÿ', 'Y'], ['Ź', 'Z'], ['Ż', 'Z'], ['Ž', 'Z'],
    ['ź', 'z'], ['ż', 'z'], ['ž', 'z'],

    // Vietnamese Characters
    ['À', 'A'], ['Á', 'A'], ['Â', 'A'], ['Ã', 'A'], ['È', 'E'], ['É', 'E'], ['Ê', 'E'], ['Ì', 'I'],
    ['Í', 'I'], ['Ò', 'O'], ['Ó', 'O'], ['Ô', 'O'], ['Õ', 'O'], ['Ù', 'U'], ['Ú', 'U'], ['Ý', 'Y'],
    ['à', 'a'], ['á', 'a'], ['â', 'a'], ['ã', 'a'], ['è', 'e'], ['é', 'e'], ['ê', 'e'], ['ì', 'i'],
    ['í', 'i'], ['ò', 'o'], ['ó', 'o'], ['ô', 'o'], ['õ', 'o'], ['ù', 'u'], ['ú', 'u'], ['ý', 'y'],
    ['Ă', 'A'], ['ă', 'a'], ['Đ', 'D'], ['đ', 'd'], ['Ĩ', 'I'], ['ĩ', 'i'], ['Ũ', 'U'], ['ũ', 'u'],
    ['Ơ', 'O'], ['ơ', 'o'], ['Ư', 'U'], ['ư', 'u'], ['Ạ', 'A'], ['ạ', 'a'], ['Ả', 'A'], ['ả', 'a'],
    ['Ấ', 'A'], ['ấ', 'a'], ['Ầ', 'A'], ['ầ', 'a'], ['Ẩ', 'A'], ['ẩ', 'a'], ['Ẫ', 'A'], ['ẫ', 'a'],
    ['Ậ', 'A'], ['ậ', 'a'], ['Ắ', 'A'], ['ắ', 'a'], ['Ằ', 'A'], ['ằ', 'a'], ['Ẳ', 'A'], ['ẳ', 'a'],
    ['Ẵ', 'A'], ['ẵ', 'a'], ['Ặ', 'A'], ['ặ', 'a'], ['Ẹ', 'E'], ['ẹ', 'e'], ['Ẻ', 'E'], ['ẻ', 'e'],
    ['Ẽ', 'E'], ['ẽ', 'e'], ['Ế', 'E'], ['ế', 'e'], ['Ề', 'E'], ['ề', 'e'], ['Ể', 'E'], ['ể', 'e'],
    ['Ễ', 'E'], ['ễ', 'e'], ['Ệ', 'E'], ['ệ', 'e'], ['Ỉ', 'I'], ['ỉ', 'i'], ['Ị', 'I'], ['ị', 'i'],
    ['Ọ', 'O'], ['ọ', 'o'], ['Ỏ', 'O'], ['ỏ', 'o'], ['Ố', 'O'], ['ố', 'o'], ['Ồ', 'O'], ['ồ', 'o'],
    ['Ổ', 'O'], ['ổ', 'o'], ['Ỗ', 'O'], ['ỗ', 'o'], ['Ộ', 'O'], ['ộ', 'o'], ['Ớ', 'O'], ['ớ', 'o'],
    ['Ờ', 'O'], ['ờ', 'o'], ['Ở', 'O'], ['ở', 'o'], ['Ỡ', 'O'], ['ỡ', 'o'], ['Ợ', 'O'], ['ợ', 'o'],
    ['Ụ', 'U'], ['ụ', 'u'], ['Ủ', 'U'], ['ủ', 'u'], ['Ứ', 'U'], ['ứ', 'u'], ['Ừ', 'U'], ['ừ', 'u'],
    ['Ử', 'U'], ['ử', 'u'], ['Ữ', 'U'], ['ữ', 'u'], ['Ự', 'U'], ['ự', 'u'], ['Ỳ', 'Y'], ['ỳ', 'y'],
    ['Ỵ', 'Y'], ['ỵ', 'y'], ['Ỷ', 'Y'], ['ỷ', 'y'], ['Ỹ', 'Y'], ['ỹ', 'y']
]);
export function unicodeToAscii(input: string) {
    return input.split('').map(char => accentsMap.get(char) || char).join('');
}
export function removeNonLetterAndDash(input: string) {
    return input.replace(/[^a-zA-Z0-9]/g, '-');
}

export function ConvertTitleToAscii1(input: string) {
    const temp = unicodeToAscii(input)
    return removeNonLetterAndDash(temp)
}

export function ConvertTitleToAscii(input: string) {
    return removeNonLetterAndDash(slugify(input ?? "") ?? "")?.toLowerCase()
}