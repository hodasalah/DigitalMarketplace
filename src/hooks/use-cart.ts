import { Product } from '@/payload-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartState = {
	items: Product[];
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	clearCart: () => void;
};
export const useCart = create<CartState>()(
	//persiste save things in local storage
	persist(
		(set) => ({
			items: [],
			addItem: (product) =>
				set((state) => {
					return { items: [...state.items, { ...product }] };
				}),
			removeItem: (productId: string) =>
				set((state) => {
					let cartItems = state.items.filter(
						(item) => item.id !== productId,
					);
					return { items: cartItems };
				}),
			clearCart: () => set({ items: [] }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
