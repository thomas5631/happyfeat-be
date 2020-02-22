import env from 'env-var';
import { logger } from './utils/logger';
import { server } from './server';

const port = env.get('PORT').asPortNumber() || 8080;

server.listen(port, () => {
    logger.info(`🚀 Application running on ${port}`);
});
