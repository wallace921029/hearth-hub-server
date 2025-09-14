import userRoutes from "./user/index.js";
function registerRoutes(fastify) {
    fastify.register(userRoutes, { prefix: '/user' });
}
export default registerRoutes;
//# sourceMappingURL=index.js.map