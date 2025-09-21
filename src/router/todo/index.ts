import type { FastifyInstance } from "fastify";
import type { TodoDTO } from "../../types/dto/todo.ts";
import { fail } from "../../utils/common-result/index.ts";

function todoRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => {
        const user = request.user
        console.log('> user', user)


        return { message: 'Hello Fastify + TypeScript!' };
    })

    fastify.post('/', async (request, reply) => {
        const body = request.body as TodoDTO;

        return { message: 'Hello Fastify + TypeScript!' };
    })
}

export default todoRoutes;
