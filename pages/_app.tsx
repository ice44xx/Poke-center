import '../styles/globals.scss';
import { AppProps } from "next/app";
import React from 'react';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <main>
                <Component {...pageProps}/>
            </main>
        </>
    )
}
export default MyApp;