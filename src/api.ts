import express from 'express';
import { readFileSync, existsSync } from 'fs';
import { decryptPage } from './pages';
import { getPageParams } from './generics';

const app = express();
const PORT = 4567;

const PATH = '/home/amen/panel/src/site'
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(`${PATH}/index.html`);
});

const PAGE_PATH = `${PATH}/pages`;
app.post('/:page', (req: express.Request, res: express.Response) => {
    const page = req.params.page;
    if(!page) {
        console.log('no page');
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
        const err = JSON.parse(body_check.error.message)[0];
        console.log(err);
        return res.sendStatus(404);
    }

    const enc_data = readFileSync(path).toString();
    console.log(enc_data);

    const pwd = body_check.data.pwd;
    let data;
    try {
        data = decryptPage(enc_data, pwd);
    } catch(e) {
        console.log(e);
        return res.sendStatus(404);
    }

    res.status(200).send(data);
});

app.listen(PORT, () => {
    console.log(`shh im listening to port ${PORT}`);
})