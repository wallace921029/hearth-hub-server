import type {FastifyInstance} from "fastify";
import type {SignUpDTO} from "../../types/dto/auth.js";

function authRoutes(fastify: FastifyInstance) {
    fastify.post('/sign-up', async (request, reply) => {
        const body = request.body as SignUpDTO;
        console.log(body);
        // 如何处理
        return {message: 'Hello Fastify + TypeScript!'};
    })

    fastify.get('/sign-in', async (request, reply) => {
        return {message: 'Hello Fastify + TypeScript!'};
    })

    fastify.get('/cancel', async (request, reply) => {
        return {message: 'Hello Fastify + TypeScript!'};
    })
}

export default authRoutes;