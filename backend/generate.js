const bcrypt = require('bcryptjs');
const password = 'test123'; // New password you want to set

bcrypt.hash(password, 10, (err, hash) => {
  if (err) console.error(err);
  else console.log(hash); // Copy this hashed password and update it in the database
});
