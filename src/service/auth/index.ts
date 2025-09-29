import type { SignInDTO, SignUpDTO } from "../../types/dto/auth.js";
import type { UserPO } from "../../types/po/user.ts";
import { comparePassword, encryptPassword } from "../../utils/encrypt/index.js";
import type { FastifyInstance } from "fastify";
import { type RowDataPacket } from "@fastify/mysql";
import camelcaseKeys from "camelcase-keys";

/** check if user exists */
async function checkUserExists(
  fastify: FastifyInstance,
  username: string
): Promise<boolean> {
  const [result] = await fastify.mysql.query<RowDataPacket[]>(
    "SELECT COUNT(*) as count FROM users WHERE username = ?",
    [username]
  );

  return (result[0]?.count ?? 0) > 0;
}

/** sign up service */
async function signUpService(fastify: FastifyInstance, signUpDto: SignUpDTO) {
  // check if user exists
  const isExist = await checkUserExists(fastify, signUpDto.username);

  if (isExist) {
    throw new Error("User already exists");
  }

  try {
    // encrypt password
    const hash = await encryptPassword(signUpDto.password);

    // convert to UserPO
    const userPo: UserPO = {
      username: signUpDto.username,
      encryptedPassword: hash,
      nickname: signUpDto.nickname ?? null,
      email: signUpDto.email ?? null,
      phone: signUpDto.phone ?? null,
    };

    // insert into database
    await fastify.mysql.query(
      "INSERT INTO users (username, encrypted_password, nickname, email, phone) VALUES (?, ?, ?, ?, ?)",
      [
        userPo.username,
        userPo.encryptedPassword,
        userPo.nickname,
        userPo.email,
        userPo.phone,
      ]
    );

    return true;
  } catch (error) {
    throw error;
  }
}

/** sign in service */
async function signInService(fastify: FastifyInstance, signInDTO: SignInDTO) {
  try {
    // check the username and password is correct
    const [result] = await fastify.mysql.query<RowDataPacket[]>(
      "SELECT id, username, encrypted_password FROM users WHERE username = ?",
      [signInDTO.username]
    );

    if (result.length === 0) {
      throw new Error("Incorrect username or password");
    }

    const user = result[0]!;
    const isMatch = await comparePassword(
      signInDTO.password,
      user.encrypted_password
    );

    if (!isMatch) {
      throw new Error("Incorrect username or password");
    }

    // jwt token generation can be added here
    return fastify.jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      { expiresIn: "30 days" }
    );
  } catch (error) {
    throw error;
  }
}

export default {
  checkUserExists,
  signUpService,
  signInService,
};
