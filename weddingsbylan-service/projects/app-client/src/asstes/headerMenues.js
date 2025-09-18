/** @type {import('../services/static-data/types').IMenu[]} */
const headerMenues = [{
    Key: "Home",
    Name: 'Trang chủ',
    Href: '/',
    Hrefs: { en: '/', vn: '/' }
},
{
    Key: "Service",
    Name: 'Dịch vụ',
    Href: '/service',
    Hrefs: { en: '/service', vn: '/dich-vu' }
},
{
    Key: "Portfolio",
    Name: 'HS năng lực',
    Href: '/profile',
    Hrefs: { en: '/profile', vn: '/ho-so-nang-luc' }
},
{
    Key: "Recruitment",
    Name: 'Tuyển dụng',
    Href: '/recruitment',
    Hrefs: { en: '/recruitment', vn: '/tuyen-dung' }
},
{
    Key: "Blog",
    Name: 'Tin tức',
    Href: '/blog',
    Hrefs: { en: '/blog', vn: '/tin-tuc' }
},
{
    Key: "Contact",
    Name: 'Liên hệ',
    Href: '/contact',
    Hrefs: { en: '/contact', vn: '/lien-he' }
},]

module.exports = headerMenues