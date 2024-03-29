import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingIcon } from './Icons'
import { AppDispatch, RootState } from './store'
import {
    decrementOrderedQuantity,
    fetchProducts,
    incrementOrderedQuantity,
    selectDiscount,
    selectTotalWithDiscount,
} from './productsSlice'
import styles from './Checkout.module.css'

const NO_DISCOUNT = 0
const NO_AVAILABLE_COUNT = 0
const NO_ORDERED_QUANTITY = 0

type Props = {
    id: number
    name: string
    price: number
    total: number
    availableCount: number
    orderedQuantity: number
}
const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
}: Props) => {
    const dispatch = useDispatch()

    const onIncrement = () => {
        dispatch(incrementOrderedQuantity(id))
    }

    const onDecrement = () => {
        dispatch(decrementOrderedQuantity(id))
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <button
                    disabled={availableCount === NO_AVAILABLE_COUNT}
                    className={styles.actionButton}
                    onClick={onIncrement}
                >
                    +
                </button>
                <button
                    disabled={orderedQuantity === NO_ORDERED_QUANTITY}
                    className={styles.actionButton}
                    onClick={onDecrement}
                >
                    -
                </button>
            </td>
        </tr>
    )
}
const Checkout = () => {
    const dispatch: AppDispatch = useDispatch()
    const { data, loading, error } = useSelector((state: RootState) => state.products)
    const discount = useSelector((state: RootState) => selectDiscount(state))
    const total = useSelector((state: RootState) => selectTotalWithDiscount(state))

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {loading && <LoadingIcon />}
                {error && <h4 style={{ color: 'red' }}>{error}</h4>}
                {!loading && !error && (
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th># Available</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product) => (
                                    <Product 
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        availableCount={product.availableCount}
                                        price={product.price}
                                        orderedQuantity={product.orderedQuantity}
                                        total={product.total}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <h2>Order summary</h2>
                        {discount === NO_DISCOUNT ? null : <p>Discount: {discount.toFixed(2)}$ </p>}
                        <p>Total: {total.toFixed(2)}$ </p>
                    </>
                )}
            </main>
        </div>
    )
}

export default Checkout
