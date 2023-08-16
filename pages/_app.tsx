import '../styles/globals.scss';
import { AppProps } from "next/app";
import Head from "next/head";
import React from 'react';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"></link>
            </Head>
            <Component {...pageProps}/>
        </>
    )
}
export default MyApp;