import { authRouter } from './auth-router';
import { productsRouter } from './products-router';
import { router } from './trpc';

export const appRouter = router({
	//here we define our routes[endpoint]
	auth: authRouter,
	getInfiniteProducts: productsRouter,
});
export type AppRouter = typeof appRouter;
