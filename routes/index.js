import { Hono } from 'hono';
import { getHealth, getProfile, verification } from '../controller/profile';

const app = new Hono();

app.get('/health', getHealth);
app.get('/profile', getProfile);
app.post('/verification', verification);

export default app;
