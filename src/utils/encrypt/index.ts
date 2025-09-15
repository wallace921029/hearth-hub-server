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

function comparePassword(password: string, hash: string, done: (isMatch: boolean) => void) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }

        done(isMatch)
    })
}

export {
    hashPassword,
    comparePassword
}