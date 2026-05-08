import express from 'express';

const app = express();
const PORT = 4567;

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('/home/amen/panel/src/site/index.html');
});

app.get('/main', (req: express.Request, res: express.Response) => {
    res.sendFile('/home/amen/panel/src/site/pages/main');
});

app.listen(PORT, () => {
    console.log(`shh im listening to port ${PORT}`);
})