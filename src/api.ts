import express from 'express';

const app = express();
const PORT = 4567;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('hello');
});

app.listen(PORT, () => {
    console.log(`shh im listening to port ${PORT}`);
})