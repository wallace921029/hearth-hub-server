import type { FastifyInstance } from "fastify";
import userService from "../../service/user/index.ts";
import { success } from "../../utils/common-result/index.ts";

function userRoutes(fastify: FastifyInstance) {
  fastify.get("/my-details", async (request, reply) => {
    const user = request.user;

    const userDetails = await userService.getUserDetailsByUserId(
      fastify,
      user.userId
    );

    return success(userDetails);
  });
}

export default userRoutes;
