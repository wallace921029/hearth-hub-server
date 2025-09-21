import type { FastifyInstance } from "fastify";
import authRoutes from "./auth/index.js";
import userRoutes from "./user/index.js";
import todoRoutes from "./todo/index.js";

function registerRoutes(fastify: FastifyInstance) {
    fastify.register(authRoutes, { prefix: '/auth' });
    fastify.register(userRoutes, { prefix: '/users' });
    fastify.register(todoRoutes, { prefix: '/todos' });
}

export default registerRoutes