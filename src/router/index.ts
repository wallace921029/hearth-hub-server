import type {FastifyInstance} from "fastify";
import userRoutes from "./user/index.js";
import authRoutes from "./auth/index.js";

function registerRoutes(fastify: FastifyInstance) {
    fastify.register(userRoutes, {prefix: '/users'});
    fastify.register(authRoutes, {prefix: '/auth'});
}

export default registerRoutes