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

// Handle POST /convert
app.post('/convert', (req, res) =>
{
  setTimeout(() =>
  {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsius = (fahrenheit - 32) * (5 / 9);

    res.send(`
      <p>
        ${fahrenheit} degrees Farenheit is equal to ${celsius.toFixed(2)} degrees Celsius.
      </p>
    `)
  }, 1000);
})

// Handle polling GET request /poll
let counter = 0;
app.get('/poll', (req, res) =>
{
  counter++;
  const data = { value: counter };
  res.json(data);
})

// Handle GET request for weather
let currentTemperature = 20;
app.get("/get-temperature", (req, res) =>
{
  currentTemperature += Math.random() * 2 - 1;
  res.send(currentTemperature.toFixed(1) + '°C');
})

// Handle POST /search/api
const contacts = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Doe', email: 'jane@example.com' },
  { name: 'Alice Smith', email: 'alice@example.com' },
  { name: 'Bob Williams', email: 'bob@example.com' },
  { name: 'Mary Harris', email: 'mary@example.com' },
  { name: 'David Mitchell', email: 'david@example.com' },
];

app.post('/search', (req, res) =>
{
  const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm)
  {
    return res.send('<tr></tr>');
  }

  const searchResults = contacts.filter((contact) =>
  {
    const name = contact.name.toLowerCase();
    const email = contact.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  setTimeout(() =>
  {
    const searchResultHtml = searchResults
      .map(
        (contact) => `
      <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div class="my-4 p-2">${contact.email}</div></td>
      </tr>
    `
      )
      .join('');

    res.send(searchResultHtml);
  }, 700);
})

// Handle POST request for contacts search from jsonplaceholder
app.post('/search/api', async (req, res) =>
{
  const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm)
  {
    return res.send('<tr></tr>');
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const contacts = await response.json();

  const searchResults = contacts.filter((contact) =>
  {
    const name = contact.name.toLowerCase();
    const email = contact.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  setTimeout(() =>
  {
    const searchResultHtml = searchResults
      .map(
        (contact) => `
      <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div class="my-4 p-2">${contact.email}</div></td>
      </tr>
    `
      )
      .join('');

    res.send(searchResultHtml);
  }, 700);
});

app.listen(3000, () =>
{
  console.log('Server started on port 3000');
});