import bcrypt from 'bcrypt';


async function encryptPassword(password: string) {
    const SALT_ROUNDS = 10;

    return await bcrypt.hash(password, SALT_ROUNDS)
}

async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}

export {
    encryptPassword,
    comparePassword
}