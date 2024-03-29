import { Provider } from 'react-redux'
import './App.css'
// import Checkout from './JS/Checkout'
import Checkout from './TS/Checkout'
import { store } from './TS/store'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Checkout />
            </div>
        </Provider>
    )
}

export default App
