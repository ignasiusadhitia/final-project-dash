import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  promotions: [
    {
      id: 1,
      promotionName: 'Promo Akhir Tahun',
      startDate: '02/11/2024',
      endDate: '11/11/2024',
      promotionType: 'Direct Discount',
      description: 'Potongan 20% dengan pembelian di atas 100rb',
      status: 'Active',
      published: true,
      promotionLimit: '10',
      product: 'Laptop',
      discount: 'A',
    },
    {
      id: 2,
      promotionName: 'Cuci Gudang',
      startDate: '01/11/2024',
      endDate: '10/11/2024',
      promotionType: 'Voucher Code',
      description: 'Potongan 30% dengan pembelian di atas 100rb',
      status: 'Active',
      published: false,
      promotionLimit: '10',
      product: 'Laptop',
      discount: 'A',
    },
    {
      id: 3,
      promotionName: 'Spesial Kemerdekaan',
      startDate: '29/10/2024',
      endDate: '09/11/2024',
      promotionType: 'Direct Discount',
      description: 'Potongan 10% dengan pembelian di atas 100rb',
      status: 'Inactive',
      published: false,
      promotionLimit: '10',
      product: 'Laptop',
      discount: 'A',
    },
    {
      id: 4,
      promotionName: 'Hari Kartini',
      startDate: '21/10/2024',
      endDate: '30/10/2024',
      promotionType: 'Direct Discount',
      description: 'Potongan 15% dengan pembelian di atas 100rb',
      status: 'Inactive',
      published: false,
      promotionLimit: '10',
      product: 'Laptop',
      discount: 'A',
    },
    {
      id: 5,
      promotionName: 'Flash Sale Akhir Tahun',
      startDate: '15/12/2024',
      endDate: '31/12/2024',
      promotionType: 'Flash Sale',
      description: 'Potongan hingga 50% untuk semua produk',
      status: 'Active',
      published: true,
      promotionLimit: '10',
      product: 'Laptop',
      discount: 'A',
    },
    {
      id: 6,
      promotionName: 'Bonus Akhir Pekan',
      startDate: '08/12/2024',
      endDate: '10/12/2024',
      promotionType: 'Bonus Reward',
      description:
        'Dapatkan bonus poin hingga 200 untuk pembelian minimal 100rb',
      status: 'Active',
      published: false,
      promotionLimit: '10',
      product: 'Laptop',
      discount: 'A',
    },
  ],
  data: {},
};

const promotionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addPromotion: (state, action) => {
      state.promotions.push(action.payload);
    },
    setPromotion: (state, action) => {
      state.data = action.payload;
    },
    deletePromotion: (state, action) => {
      const { id } = action.payload;
      state.promotions = state.promotions.filter(
        (promotion) => promotion.id !== id
      );
    },
    editPromotion: (state, action) => {
      const { id, newPromotion } = action.payload;
      const index = state.promotions.findIndex(
        (promotion) => promotion.id === id
      );
      if (index !== -1) {
        state.promotions[index] = {
          ...state.promotions[index],
          ...newPromotion,
        };
      }
    },
    getPromotionDetail: (state, action) => {
      const id = Number(action.payload);
      const promotion = state.promotions.find(
        (promotion) => promotion.id === id
      );
      if (promotion) {
        state.data = promotion;
      }
    },
  },
});

export const { addPromotion, editPromotion, setPromotion, getPromotionDetail } =
  promotionSlice.actions;
export default promotionSlice.reducer;
