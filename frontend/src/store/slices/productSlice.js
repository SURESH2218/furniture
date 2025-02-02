import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'
export const fetchProducts = createAsyncThunk('products/fetch', 
  async (_, {rejectWithValue}) => {
    try{
      const res = await api.get('/product/products')
      if(res){
          console.log('\n the data in call is ', res.data.data, '\n and its type is ', typeof(res.data.data), '\n is this array', Array.isArray(res.data.data))
          return res.data.data
      }
    }
    catch(error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }

})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      // console.log(action.payload);

      state.products = action.payload;
      console.log(state, action);
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder)  => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
        console.log('\n\n Products after setting:', state.products, '\n\n and type is ', typeof(state.products), '\n\n the type of action payload is', typeof(action.payload)); 

      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
});

export const {
  setProducts,
  setCurrentProduct,
  setLoading,
  setError,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
