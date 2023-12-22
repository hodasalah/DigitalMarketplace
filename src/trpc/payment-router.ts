import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { getPayloadClient } from '../get-payload';
import { stripe } from '../lib/stripe';
import { privateProcedure, router } from './trpc';

export const paymentRouter = router({
	createPaymentSession: privateProcedure
		.input(
			z.object({
				productIds: z.array(z.string()),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx;
			let { productIds } = input;

			// find stripeIdes from product

			if (productIds.length === 0) {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}

			const payload = await getPayloadClient();

			const { docs: products } = await payload.find({
				collection: 'products',
				where: {
					id: {
						in: productIds,
					},
				},
			});

			// create session to stripe
			// first npm i stripe
			// in src lib add stripe.ts file
			const filteredProducts = products.filter((prod) =>
				Boolean(prod.priceId),
			);

			const order = await payload.create({
				collection: 'orders',
				data: {
					_isPaid: false,
					products: filteredProducts.map((prod) => prod.id),
					user: user.id,
				},
			});

			const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
				[];

			filteredProducts.forEach((product) => {
				line_items.push({
					price: product.priceId!,
					quantity: 1,
				});
			});

			line_items.push({
				price: process.env.STRIPE_PRODUCT_PRICE_ID,
				quantity: 1,
				adjustable_quantity: {
					enabled: false,
				},
			});

			try {
				const stripeSession = await stripe.checkout.sessions.create({
					success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
					cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
					payment_method_types: ['card', 'paypal'],
					mode: 'payment',
					metadata: {
						userId: user.id,
						orderId: order.id,
					},
					line_items,
				});

				return { url: stripeSession.url };
			} catch (err) {
				return { url: null };
			}
		}),
});
