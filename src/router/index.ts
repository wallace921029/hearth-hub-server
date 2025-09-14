import type {FastifyInstance} from "fastify";
import userRoutes from "./user/index.js";

function registerRoutes(fastify: FastifyInstance) {
    fastify.register(userRoutes, {prefix: '/user'});
}

export default registerRoutes