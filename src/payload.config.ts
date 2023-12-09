import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import { Users } from './collections/Users'



dotenv.config({
  path: path.resolve(__dirname, "../.env")
})
export default buildConfig({
  // By default, Payload will boot up normally
  // and you will be provided with a base `User` collection.
  // But, here is where you define how you'd like Payload to work!
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",

  collections: [Users],
  // Configure the Mongoose adapter here
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.MONGODB_URL ? process.env.MONGODB_URL : false,
    connectOptions: {
      dbName: "DigitalMarketplace"
    }


  }),

  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalMarketplace",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg"
    },
    //css: path.resolve(__dirname, 'src/app/payload.css'),

  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts")
  }

})