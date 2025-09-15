import bcrypt from 'bcrypt';

const SAULT_ROUNDS = 10;

function hashPassword(password: string, done: (hash: string) => void) {
    bcrypt.hash(password, SAULT_ROUNDS, (err, hash) => {
        if (err) {
            throw err;
        }
        done(hash)
    })
}