import { z } from 'zod';
import { getPayloadClient } from '../get-payload';
import { publicProcedure, router } from './trpc';

export const singleProductRouter = router({
	getProductById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input }) => {
			const { id } = input;
			const payload = await getPayloadClient();
			const { docs: products } = await payload.find({
				collection: 'products',
				limit: 1,
				where: {
					id: {
						equals: id,
					},
					approvedForSale: {
						equals: 'approved',
					},
				},
			});
			return { products };
		}),
});
