export type Product = {
    id: number
    name: string
    price: number
    availableCount: number
}

export function getProducts() {
    return getData('/products.json')
}

function getData(endpoint: string): Promise<{ products: Product[] }> {
    const delay = (0.5 + Math.random() * 2) * 1000
    return new Promise((resolve, reject) => {
        if (delay < 1800) {
            const successId = setTimeout(function () {
                fetch(endpoint).then((res) => {
                    clearTimeout(successId)
                    resolve(res.json())
                })
            }, delay)
        } else {
            const failId = setTimeout(function () {
                fetch(endpoint).then((res) => {
                    clearTimeout(failId)
                    reject(res.json())
                })
            }, delay)
        }
    })
}
