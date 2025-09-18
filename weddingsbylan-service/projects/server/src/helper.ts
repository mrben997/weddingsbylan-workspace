import slugify from "slugify";
import { configDatasouce } from "./datasources";
import fs from 'fs'
//TODO:
// export const PathStore = {
//     PathPublic: './public',
//     Setting: "./public/images/settings",
//     News: "./public/images/news",
//     Service: "./public/images/services"
// }

//production
export const ImagePath = "/api/images/"

export const PathStore = {
    PathPublic: './public-prod',
    Setting: "./public-prod/images/settings",
    News: "./public-prod/images/news",
    Ckeditor: "./public-prod/images/ckeditor",
    Service: "./public-prod/images/services",
    Recruitment: "./public-prod/images/recruitments"
}

export const InitialPublic = async () => {
    for (const key in PathStore) {
        const dirPath = (PathStore as any)[key];
        try {
            // Use fs.promises.mkdir with recursive: true to create directories if they don't exist
            await fs.promises.mkdir(dirPath, { recursive: true });
        } catch (error) {
            console.error(`Failed to create directory: ${dirPath}`, error);
        }
    }
};
export const convertToPascalCase = <T>(obj: any): T => {
    const result: any = {};
    Object.keys(obj).forEach((key) => {
        // Chuyển đổi key thành PascalCase (chữ cái đầu của mỗi từ viết hoa)
        const pascalCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
            .replace(/^[a-z]/, (match) => match.toUpperCase());
        result[pascalCaseKey] = obj[key];
    });
    return result;
}

//TODO: mysql  RAND(), SQL server NEWID() ,POSTGRES RANDOM()
export const OrderRandom = () => {
    switch (configDatasouce.connector) {
        case 'mysql':
            return "ORDER BY RAND()"
        case 'postgresql':
            return "ORDER BY RANDOM()"
        case 'mssql':
            return "ORDER BY NEWID()"
        default:
            throw new Error("Not support random");
    }
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

export function ConvertTitleToAscii(input: string) {
    return removeNonLetterAndDash(slugify(input ?? "") ?? "")?.toLowerCase()
}