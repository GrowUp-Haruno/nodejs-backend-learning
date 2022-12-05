import * as http from 'http';

// class Server {
//   #httpServer
//   constructor() {
//     this.#httpServer = http.createServer
//   }

// }

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });

  // if (req.url === '/result') res.end('<p>a</p>');
  if (req.url === '/hello') res.end(`<p>こんにちわ</p>`);
  if (req.url === '/redirect') res.writeHead(302, { location: '/redirected' });
  if (req.url === '/redirected') res.end('<p>リダイレクトされました</p>');
  if (req.url === '/') {
    res.write(
      `<a href="/result?param1=パラメータ1&param2=パラメータ2">Get Method Link</a>`
    );
    res.end(`
      <form action="/result" method="POST">
        <input type="text" name="title">
        <input type="submit">
      </form>
    `);
  } else {
    if (req.method === 'GET') {
      const queryString= req.url?.split("?")[1]
      const params = new URLSearchParams(queryString);
      // res.end(`${params}`)
      console.log(params.get('param1'));
    }
    res.end(req.url);
  }
});

server.listen(8080);
