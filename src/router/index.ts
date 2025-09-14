import userRoutes from "./user/index.ts";
import type {FastifyInstance} from "fastify";

function registerRoutes(fastify: FastifyInstance) {
    fastify.register(userRoutes, {prefix: '/user'});
}

export default registerRoutes