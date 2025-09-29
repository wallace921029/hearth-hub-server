import type { RowDataPacket } from "@fastify/mysql";
import type { FastifyInstance } from "fastify";

/** get user details by id */
async function getUserDetailsByUserId(
  fastify: FastifyInstance,
  userId: number
) {
  const [result] = await fastify.mysql.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );

  if (result.length === 0) {
    throw new Error("User not found");
  }

  const user = result[0] as RowDataPacket;
  delete user.encrypted_password;

  return user;
}

export default { getUserDetailsByUserId };
