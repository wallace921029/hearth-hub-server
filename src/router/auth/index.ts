import type { FastifyInstance } from "fastify";
import type { SignInDTO, SignUpDTO } from "../../types/dto/auth.js";
import { signInService, signUpService } from "../../service/auth/index.js";
import { fail, success } from "../../utils/common-result/index.js";

function authRoutes(fastify: FastifyInstance) {
    fastify.post('/sign-up', async (request, reply) => {
        const body = request.body as SignUpDTO;
        try {
            const result = await signUpService(fastify, body)

            if (result) {
                return success(null, 'User registered successfully')
            }
        } catch (error: any) {
            return fail(error.message);
        }
    })

    fastify.post('/sign-in', async (request, reply) => {
        const body = request.body as SignInDTO
        try {
            const token = await signInService(fastify, body)

            if (token) {
                return success(token, 'User signed in successfully')
            }
        } catch (error: any) {
            return fail(error.message);
        }
    })

    fastify.get('/sign-out', async (request, reply) => {
        return { message: 'Hello Fastify + TypeScript!' };
    })
}

export default authRoutes;