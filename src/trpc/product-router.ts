import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { getPayloadClient } from '../get-payload';

export const singleProductRouter = router({
	getProductById: publicProcedure.input(z.object({id:z.string()})).query(async({input})=>{
    const {id}= input
    const payload= await getPayloadClient()
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
return {products}
  })
});
