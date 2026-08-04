import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import otpRoutes from './routes/otp.routes';
import authRoutes from './routes/auth.routes';
import { notFound, errorHandler } from './middleware/error.middleware';

const app = express();

app.disable('x-powered-by');
app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(','),
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, service: 'healthsphere-ai-api', status: 'ok' });
});

app.use('/api/otp', otpRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
