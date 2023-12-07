import { TRPCError } from '@trpc/server';
import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator';
import { publicProcedure, router } from './trpc';
export const authRouter = router({
  createPayloadUser: publicProcedure.input(AuthCredentialsValidator).mutation(async ({ input }) => {
    const { email, password } = input
    //access to our cms
    // check if user is already exist
    const payload = await getPayloadClient()
    // if user is already exist so he can't do signup again
    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email
        }
      }
    })
    // if user is already exist
    if (users.length !== 0)
      throw new TRPCError({ code: "CONFLICT" })

    //create new user
    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        role: "user"
      }
    })
    return { success: true, sentToEmail: email }
  })
})