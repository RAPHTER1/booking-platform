import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api/auth', createProxyMiddleware({
  target: 'http://auth-api:3001',
  changeOrigin: true
}));

app.use('/api/admin', createProxyMiddleware({
  target: 'http://admin-api:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/admin': '' }
}));

app.use('/api/public', createProxyMiddleware({
  target: 'http://public-api:3003',
  changeOrigin: true,
  pathRewrite: { '^/api/public': '' }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
