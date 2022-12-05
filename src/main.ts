import express, { Request } from 'express';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    <a href="/result?param1=1&param2=2">Get Method Link</a>
    <form action="/result" method="POST">
      <p>title1: <input type="text" name="title[]"></p>
      <p>title2: <input type="text" name="title[]"></p>
      <p>description: <input type="text" name="description"></p>
      <input type="submit">
    </form>
  `);
});

app.get(
  '/result',
  (req: Request<{}, {}, {}, { [key in 'param1' | 'param2']: string }>, res) => {
    const params = req.query;
    console.log(params);
    res.send(`
      <p>${params.param1}</p>
      <p>${params.param2}</p>
      `);
  }
);

app.post(
  '/result',
  (req: Request<{}, {}, { title: string[]; description: string }>, res) => {
    const params = req.body;
    console.log(params);
    res.send(`
      <p>title1: ${params.title[0]}</p>
      <p>title2: ${params.title[1]}</p>
      <p>description: ${params.description}</p>
    `);
  }
);

app.get('/json', (req, res) => {
  res.send({ message: 'hello' });
});

app.get('/send-json', (req, res) => {
  res.send(`
    <form action="/send-json/result" method="POST">
      <input type="text" name="title">
      <input type="text" name="description">
      <input type="submit">
    </form>
    <script>
      const formEl = document.querySelector('form')
      formEl.onsubmit = function(event) {
        event.preventDefault();
        const title = formEl[0].value
        const desc = formEl[1].value
        const data = {title, desc}
        fetch('/send-json/result',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(async(res)=>{
          const data = await res.json();
          console.log(data)
        })
      }
    </script>
  `);
});

app.post(
  '/send-json/result',
  (req, res) => {
    res.json({message:'success'})
  }
);

// 必ず最後に配置すること
app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
