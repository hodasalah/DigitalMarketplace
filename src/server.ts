import * as trpcExpress from "@trpc/server/adapters/express";
import dotenv from "dotenv";
import express from "express";
import path from 'path';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import { appRouter } from './trpc';
//initialise our app with express
const app = express();
// define our server port
dotenv.config({
  path: path.resolve(__dirname, "../.env")
})
const PORT = Number(process.env.PORT) || 3000;
//createContext function
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  req, res
})
const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
      }
    }
  })
  app.use("/api/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext
  }))
  app.use((req, res) => nextHandler(req, res))
  nextApp.prepare().then(() => {
    payload.logger.info("Next js started")
    app.listen(PORT, async () => {
      payload.logger.info(`Next js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}
void start()