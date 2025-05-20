import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const port = process.env.PORT || 3000; // gunakan 3000 default aman
const hostname = '0.0.0.0'; // pastikan bisa diakses di semua host
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, () => {
    console.log(
      `> Server listening at http://${hostname}:${port} as ${
        dev ? 'development' : 'production'
      }`
    );
  });
});
