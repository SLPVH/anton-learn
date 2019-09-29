import { start } from "./server";

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at: Promise ', promise, ' reason: ', reason);
});

const bootstrap = async () => {
    await start();
};

bootstrap();
