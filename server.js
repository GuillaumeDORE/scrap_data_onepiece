const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 8000;

const app = express();
const urlToScrap = 'https://www.scan-vf.net/one_piece';

axios(urlToScrap)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let chapters = [];
        const chapt = $('.chapters', html)

        $('li', chapt).each(function () {
            const title = $(this).find('em').text();
            const chapter = $(this).find('a').text().split(' ')[2];
            const date = $(this).find('.date-chapter-title-rtl').text().split('\n')[1].trim();
            chapters.push({
                chapter,
                title,
                date
            });
        });
        console.log(chapters);
    }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));