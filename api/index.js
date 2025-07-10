import { buildApp } from '../src/app';
let cachedApp = null;
export default async function handler(req, res) {
    if (!cachedApp) {
        cachedApp = await buildApp();
        await cachedApp.ready();
    }
    cachedApp.server.emit('request', req, res);
}
