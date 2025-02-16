import { Hono } from 'hono';
import indexRouter from './routes';

const app = new Hono();

app.route('/', indexRouter);

export default app;
