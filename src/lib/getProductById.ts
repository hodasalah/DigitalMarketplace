import { getPayloadClient } from '../get-payload';

export const getProductById = async (id: string) => {
	const payload = await getPayloadClient();
	const {docs} = await payload.find({
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
	return {docs};
};
