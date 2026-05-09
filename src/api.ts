import express from 'express';
import { readFileSync, existsSync } from 'fs';
import { decryptPage } from './pages.ts';
import { getPageParams } from './generics.ts';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

config({ path: '/home/amen/panel/src/.env' });

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PWD!));

const PORT = 4567;

const PATH = '/home/amen/panel/src/site'
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(`${PATH}/index.html`);
});

app.get('/panel', (req: express.Request, res: express.Response) => {
    let tfsid;
    if('tfsid' in req.signedCookies) tfsid = req.signedCookies.tfsid;
    else {
        console.log('no tfsid');
        return res.sendStatus(404);
    }

    return res.sendStatus(200);
});

const PAGE_PATH = `${PATH}/pages`;
app.post('/:page', (req: express.Request, res: express.Response) => {
    const page = req.params.page;
    if(!page) {
        console.log('no page');
        return res.sendStatus(404);
    }

    if(typeof(page) !== 'string') {
        console.log('page not string');
        return res.sendStatus(404);
    }

    const path = `${PAGE_PATH}/${page}`;
    if(!existsSync(path)) {
        console.log('page doesnt exist');
        return res.sendStatus(404);
    }

    if(!req.body) {
        console.log('no data');
        return res.sendStatus(404);
    }

    const body_check = getPageParams.safeParse(req.body);
    if(!body_check.success) {
        console.log('body check error');
        return res.sendStatus(404);
    }

    const enc_data = readFileSync(path).toString();
    const pwd = body_check.data.pwd;
    let data;
    try {
        data = decryptPage(enc_data, pwd);
    } catch(e) {
        console.log(e);
        return res.sendStatus(404);
    }

    if(!data) {
        console.log('no data');
        return res.sendStatus(404);
    }

    res.status(200).send(data);
});

app.listen(PORT, () => {
    console.log(`shh im listening to port ${PORT}`);
})