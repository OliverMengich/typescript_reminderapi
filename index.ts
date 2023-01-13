// install
//1. express
//2. typescript
//3. @types/node
//4. @types/express
//npm i -D express typescript @types/node @types/express
import express from 'express';
import remindersRouter from './routers/reminders';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/reminders',remindersRouter);
app.get('/', (_, res) => {
    res.send('Hello World!')
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
