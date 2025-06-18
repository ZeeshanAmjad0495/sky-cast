import { FastifyInstance } from 'fastify';

async function registerHealthCheckRoutes(server: FastifyInstance) {
  server.get('/health', async () => {
    return { status: 'ok' };
  });
}

export default registerHealthCheckRoutes;
