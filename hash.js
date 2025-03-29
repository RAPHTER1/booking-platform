import bcrypt from 'bcryptjs';

const password = 'password';
const saltRounds = 10;

bcrypt.hash(password, saltRounds)
    .then(hashed => {
        console.log(hashed);
    })
    .catch(err => {
        console.error(err);
    });