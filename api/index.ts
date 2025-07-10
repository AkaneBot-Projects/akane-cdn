import { VercelRequest, VercelResponse } from '@vercel/node'
import { buildApp } from '../src/app'

let cachedApp: Awaited<ReturnType<typeof buildApp>> | null = null

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedApp) {
    cachedApp = await buildApp()
    await cachedApp.ready()
  }

  cachedApp.server.emit('request', req, res)
} 