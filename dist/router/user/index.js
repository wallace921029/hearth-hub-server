async function userRoutes(fastify) {
    fastify.get('/', async (request, reply) => {
        return { message: 'Hello Fastify + TypeScript!' };
    });
}
export default userRoutes;
//# sourceMappingURL=index.js.map