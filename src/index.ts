import http from 'http';
import { app } from './server';

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

async function start() {
  server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
  });
}

start();
