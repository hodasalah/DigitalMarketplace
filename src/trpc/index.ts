import { authRouter } from './auth-router';
import { router } from './trpc';

export const appRouter = router({
  //here we define our routes[endpoint]
  auth: authRouter
})
export type AppRouter = typeof appRouter