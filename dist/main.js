import Fastify from 'fastify';
import registerRoutes from './router/index.js';
const instance = Fastify({ logger: true });
instance.register(registerRoutes, { prefix: '/api' });
const start = async () => {
    try {
        await instance.listen({ port: 3000 });
        console.log('Server running at http://localhost:3000');
    }
    catch (err) {
        instance.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=main.js.map