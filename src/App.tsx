import Home from './components/home/Home';
import {Provider} from "react-redux";
import store from "@/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Home/>
            </div>
        </Provider>
    )
}

export default App
