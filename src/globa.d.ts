// src/types/fastify.d.ts
import "fastify";

declare module "fastify" {
    interface FastifyInstance {
        verifyToken: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;
    }

    interface FastifyRequest {
        user: {
            userId: number;
            username: string;
        };
    }
}

// 关键：加上这一行，避免全局声明污染
export { };