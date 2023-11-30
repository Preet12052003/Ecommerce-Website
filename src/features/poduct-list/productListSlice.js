import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters , fetchBrands , fetchCategories , fetchProductById } from './productListApi';

const initialState = {
  products: [],
  categories: [],
  brands: [],
  totalItems: 0,
  status: 'idle',
  selectedProduct: null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAllProductsAsync',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
)

export const fetchAllProductByIdAsync = createAsyncThunk(
  'products/fetchAllProductByIdAsync',
  async (id) => {
    const response = await fetchProductById(id)
    return response.data;
  }
)

export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategoriesAsync',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
)

export const fetchBrandsAsync = createAsyncThunk(
  'products/fetchBrandsAsync',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
)

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'products/fetchProductsByFiltersAsync',
  async ({filter , sort , pagination}) => {
    const response = await fetchProductsByFilters(filter , sort , pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.brands = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.selectedProduct = action.payload;
      })
  },
});

/*
The code you provided suggests that you have a slice of state called product within your Redux store, and that's why you're using state.product.products to access the products array within that slice.
*/

export const selectAllProducts = (state) => state.product.products
export const selectCategories = (state) => state.product.categories
export const selectBrands = (state) => state.product.brands
export const selectTotalItems = (state) => state.product.totalItems
export const selectProductById = (state) => state.product.selectedProduct

export const { increment } = productSlice.actions;

export default productSlice.reducer;