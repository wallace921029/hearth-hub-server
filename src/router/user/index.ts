import type {FastifyInstance} from "fastify";

function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => {
        return {message: 'Hello Fastify + TypeScript!'};
    })
}

export default userRoutes;