import type { RowDataPacket } from "@fastify/mysql";
import camelcaseKeys from "camelcase-keys";
import type { FastifyInstance } from "fastify";
import type { UserPO } from "../../types/po/user.ts";

/** get user details by id */
async function getUserDetailsByUserId(
  fastify: FastifyInstance,
  userId: number
) {
  let [result] = await fastify.mysql.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );
  result = camelcaseKeys(result, { deep: true });

  if (result.length === 0) {
    throw new Error("User not found");
  }

  const user = result[0] as UserPO;
  delete user.encryptedPassword;

  return user;
}

export default { getUserDetailsByUserId };
