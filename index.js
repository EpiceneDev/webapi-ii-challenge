const express = require('express');

// 1
const postsRouter = require('./posts/posts-router.js');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

// 2
server.use('/api/posts', postsRouter);

// server.listen(4000, () => {
//   console.log('\n*** Server Running on http://localhost:4000 ***\n');
// });
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}...`));
