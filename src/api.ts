import express from 'express';

const app = express();
const PORT = 4567;

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('./site/pages/main.html');
});

app.listen(PORT, () => {
    console.log(`shh im listening to port ${PORT}`);
})