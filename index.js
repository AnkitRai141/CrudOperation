const express = require('express');
const app = express();

app.use(express.json());  

let users = [];
let idCounter = 1; // starting point of id, we will increment it with each insert operation

// for creating new user    
app.post('/users/create', async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  const user = {
    id: idCounter++,
    name,
    age,
  };
  
  users.push(user);
  
  res.status(201).json(user);
});


// for getting all the users
app.get('/users', async (req, res) => {
  return res.status(200).json({ message: "Users retrived successfully!!!", data: users})
});



// for getting user by id
app.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(i => i.id === id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  return res.status(200).json({message: "User retrived successfully!!!", data: user})
});

// for updating user by id
app.put('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const user = users.findIndex(i => i.id === id);

  if (id === -1) {
    return res.status(404).json({ message: 'user not found' });
  }

  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  users[id] = {
    id: id,
    name,
    age,
  };

  return res.status(200).json({ message: 'User Found', data: users[id]})
});

// for deleting user
app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(i => i.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);

  res.status(200).json({ message: 'Item deleted' });
});

// Start the server
const PORT = 3200;
app.listen(PORT, (err) => {
    if(err) {
        console.log("there is some problem in running server")
    } else {
        console.log("Server is running on http://localhost:${PORT}");
    }
});