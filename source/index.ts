import express from "express";
import path from "path";
import lessMiddleware from "less-middleware";


import indexRouter from "./routes/index";


const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(5000, () => {
    console.log('Running on port 5000');
})