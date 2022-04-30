import {BrowserRouter} from "react-router-dom";
import Index from "./index";
import * as ReactDOM from 'react-dom/client';
import './app.css';
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('paisen'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Index/>
        </BrowserRouter>
    </Provider>
);
