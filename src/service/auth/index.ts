import type {SignInDTO, SignUpDTO} from "../../types/dto/auth.js";
import type {UserPO} from "../../types/po/UserPO.js";
import {comparePassword, encryptPassword} from "../../utils/encrypt/index.js";
import type {FastifyInstance} from "fastify";
import {type RowDataPacket} from "@fastify/mysql";


interface CountRow extends RowDataPacket {
    count: number;
}

interface userRowWithUsernameAndPwd extends RowDataPacket {
    username: string;
    encrypted_password: string;
}

async function checkUserExists(fastify: FastifyInstance, username: string): Promise<boolean> {
    const connection = await fastify.mysql.getConnection()
    const [result, fields] = await connection.query<CountRow[]>(
        'SELECT COUNT(*) as count FROM users WHERE username = ?',
        [username]
    )

    return (result[0]?.count ?? 0) > 0
}

async function signUpService(fastify: FastifyInstance, signUpDto: SignUpDTO) {
    // check if user exists
    const isExist = await checkUserExists(fastify, signUpDto.username)

    if (isExist) {
        throw new Error('User already exists')
    }

    try {
        // encrypt password
        const hash = await encryptPassword(signUpDto.password);

        // convert to UserPO
        const userPo: UserPO = {
            username: signUpDto.username,
            encrypted_password: hash,
            nickname: signUpDto.nickname ?? null,
            email: signUpDto.email ?? null,
            phone: signUpDto.phone ?? null
        }

        // insert into database
        const connection = await (fastify as any).mysql.getConnection()
        await connection.query(
            'INSERT INTO users (username, encrypted_password, nickname, email, phone) VALUES (?, ?, ?, ?, ?)',
            [userPo.username, userPo.encrypted_password, userPo.nickname, userPo.email, userPo.phone]
        )

        return true
    } catch (error) {
        throw error
    }
}

async function signInService(fastify: FastifyInstance, signInDTO: SignInDTO) {
    try {
        // check the username and password is correct
        const connection = await fastify.mysql.getConnection()
        const [result] = await connection.query<userRowWithUsernameAndPwd[]>(
            'SELECT username, encrypted_password FROM users WHERE username = ?',
            [signInDTO.username]
        )

        if (result.length === 0) {
            throw new Error('Incorrect username or password')
        }

        const user = result[0]!;
        const isMatch = await comparePassword(signInDTO.password, user.encrypted_password)

        if (!isMatch) {
            throw new Error('Incorrect username or password')
        }

        // jwt token generation can be added here
        return fastify.jwt.sign({
            username: user.username,
        }, {expiresIn: '30 days'})

    } catch (error) {
        throw error
    }
}

export {
    checkUserExists,
    signUpService,
    signInService
}