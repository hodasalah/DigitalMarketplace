import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
export const authRouter = router({
  /**
   * FIRST END POINT [CREATE -NEW -USER] [SIGNUP USER]
   */

  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      //access to our cms
      // check if user is already exist
      const payload = await getPayloadClient();
      // if user is already exist so he can't do signup again
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      // if user is already exist
      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      //create new user
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });
      return { success: true, sentToEmail: email };
    }),
  /**
   * SECOND END POINT [VERIFY-USER-EMAIL] [VERIFY USER]
   */

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token: token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });
      return { success: true };
    }),

  /**
   * THIRD END POINT [SIGN-IN] [SIGNIN USER]
   */
  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
