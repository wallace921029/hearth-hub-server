import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";

function verifyTokenDecorator(fastify: FastifyInstance) {
    fastify.decorate('verifyToken', async (request: FastifyRequest, reply: FastifyReply) => {
        const ignoredURLs = ['/api/auth/sign-in', '/api/auth/sign-up']

        if (ignoredURLs.includes(request.url)) {
            return;
        }

        try {
            await request.jwtVerify()
        } catch (error) {
            reply.send({
                code: 401,
                data: null,
                message: (error as any).message,
            })
        }
    })

    fastify.addHook("onRequest", fastify.verifyToken);
}

export default verifyTokenDecorator