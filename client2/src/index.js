import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider} from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux/store";
import theme from "./styles/theme";
import App from './App';
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import '../src/styles/global.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Auth0Provider
        domain="alfredasare.us.auth0.com"
        clientId="Z0dwAvNdnF1N8gL9V3lnUrpdgqj4sMpN"
        redirectUri={`${window.location.origin}/chat`}
        audience="https://alfredasare.us.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
    >
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <React.StrictMode>
                            <App/>
                        </React.StrictMode>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </ChakraProvider>
    </Auth0Provider>
    , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
