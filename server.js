const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/frase', createProxyMiddleware({
  target: 'https://api.frase.io/api',
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/frase/, ''),
}));
app.use('/api/openai', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/openai/, ''),
}));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});