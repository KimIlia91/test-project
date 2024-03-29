import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total}</td>
            <td>
                <button className={styles.actionButton}>+</button>
                <button className={styles.actionButton}>-</button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                <LoadingIcon />
                <h4 style={{ color: 'red' }}>Some thing went wrong</h4>
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
                    <tbody>{/* Products should be rendered here */}</tbody>
                </table>
                <h2>Order summary</h2>
                <p>Discount: $ </p>
                <p>Total: $ </p>
            </main>
        </div>
    )
}

export default Checkout
