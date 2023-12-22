import { authRouter } from './auth-router';
import { productsRouter } from './products-router';
import { router } from './trpc';
import {paymentRouter} from "./payment-router"

export const appRouter = router({
	//here we define our routes[endpoint]
	auth: authRouter,
	getInfiniteProducts: productsRouter,
	payment:paymentRouter
});
export type AppRouter = typeof appRouter;
