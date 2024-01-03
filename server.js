import express from 'express'

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Handle GET /users
app.get('/users', async (req, res) =>
{
  // just mockup data
  // const users = [
  //   { id: 1, name: 'John Doe' },
  //   { id: 2, name: 'Bob Cat' },
  //   { id: 3, name: 'Walter White' },
  // ];

  setTimeout(() => { }, 700); // simple delay

  //fetching users from web server
  const limit = +req.query.limit || 10;
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
  const users = await response.json();

  res.send(`
    <h2 class="text-2xl font-bold my-4">Users</h2>
    <ul>
      ${users.map(user => `<li>${user.name}</li>`).join('')}
    </ul>
  `)
})

app.listen(3000, () =>
{
  console.log('Server started on port 3000');
});