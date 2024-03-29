import { 
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createSelector, 
} from '@reduxjs/toolkit'
import { getProducts } from './dataService'
import { Product } from './dataService'
import { RootState } from './store'

const ERROR_MESSAGE = 'Some thing went wrong'
const DISCOUNT = 0.1
const DISCOUNT_THRESHOLD = 1000

interface ProductState extends Product {
    orderedQuantity: number
    total: number
}

interface ProductsState {
    data: ProductState[]
    loading: boolean
    error: string | null
    total: number
}

const createProduct = (product: Product): ProductState => {
    return {
        ...product,
        orderedQuantity: 0,
        total: 0
    }
}

const initialState: ProductsState = {
    data: [],
    loading: false,
    error: null,
    total: 0,
}

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const response = await getProducts()
        return response.products
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementOrderedQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload
            const product = state.data.find((product) => product.id === productId)
            if (product && product.availableCount > 0) {
                product.availableCount = product.availableCount - 1
                product.orderedQuantity = product.orderedQuantity + 1
                product.total = product.price * product.orderedQuantity
                state.total = state.total + product.price
            }
        },
        decrementOrderedQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload
            const product = state.data.find((product) => product.id === productId)
            if (product && product.orderedQuantity > 0) {
                product.availableCount = product.availableCount + 1
                product.orderedQuantity = product.orderedQuantity - 1
                product.total = product.price * product.orderedQuantity
                state.total = state.total - product.price
            } 
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.map(createProduct)
            })
            .addCase(fetchProducts.rejected, (state, action) =>{
                state.loading = false
                state.error = action.error.message || ERROR_MESSAGE
            })
    },
})

export const selectDiscount = createSelector(
    [(state: RootState) => state.products.total],
    (total) => {
        if (total >= DISCOUNT_THRESHOLD) {
            return total * DISCOUNT
        }

        return 0
    }
)

export const selectTotalWithDiscount = createSelector(
    [(state: RootState) => state.products.data, selectDiscount],
    (products, discount) => {
        const total = products.reduce((acc, product) => acc + product.total, 0)
        if (total >= DISCOUNT_THRESHOLD) {
            return total - discount
        }

        return total
    }
)

export const { incrementOrderedQuantity, decrementOrderedQuantity } = productsSlice.actions

export default productsSlice