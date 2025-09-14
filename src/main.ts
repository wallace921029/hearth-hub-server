import Fastify from 'fastify';
import registerRoutes from './router/index.ts'

const fastify = Fastify({logger: true});

fastify.register(registerRoutes, {prefix: '/api'});

const start = async () => {
    try {
        await fastify.listen({port: 3000});
        console.log('Server running at http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();