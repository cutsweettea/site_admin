import express from 'express';
import { readFileSync, existsSync } from 'fs';
import { decryptPage } from './pages.ts';
import { getPageParams } from './generics.ts';

const app = express();
app.use(express.json());
const PORT = 4567;

const PATH = '/home/amen/panel/src/site'
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(`${PATH}/index.html`);
});

const PAGE_PATH = `${PATH}/pages`;
const DEFAULT_RESPONSE = (res: express.Response, page: string) => {
    return res.status(404).send(`<!DOCTYPE html>\
<html lang="en">\
<head>\
<meta charset="utf-8">\
<title>Error</title>\
</head>\
<body>\
<pre>Cannot POST ${page}</pre>\
</body>\
</html>\
`);
}
app.post('/:page', (req: express.Request, res: express.Response) => {
    const page = req.params.page;
    if(!page) {
        console.log('no page');
        return res.sendStatus(404);
    }

    console.log(`get page "${page}" from ${req.ip}`);
    if(typeof(page) !== 'string') {
        console.log('page not string');
        return res.sendStatus(404);
    }

    console.log('1');
    const path = `${PAGE_PATH}/${page}`;
    if(!existsSync(path)) {
        console.log('page doesnt exist');
        return DEFAULT_RESPONSE(res, page);
    }

    console.log('2');
    if(!req.body) {
        console.log('no data');
        return DEFAULT_RESPONSE(res, page);
    }

    console.log('3');
    const body_check = getPageParams.safeParse(req.body);
    if(!body_check.success) {
        console.log('body check error');
        return DEFAULT_RESPONSE(res, page);
    }

    console.log('4');
    const enc_data = readFileSync(path).toString();
    const pwd = body_check.data.pwd;
    let data;
    try {
        data = decryptPage(enc_data, pwd);
    } catch(e) {
        console.log(e);
        return DEFAULT_RESPONSE(res, page);
    }

    console.log('5');
    if(!data) {
        console.log('no data');
        return DEFAULT_RESPONSE(res, page);
    }

    console.log('6');
    console.log(data);
    res.status(200).send(data);
});

app.listen(PORT, () => {
    console.log(`shh im listening to port ${PORT}`);
})