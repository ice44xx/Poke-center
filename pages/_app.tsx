import '../styles/globals.scss';
import { AppProps } from 'next/app';
import styles from '../styles/home.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {loading ? (
        <main>
          <Component {...pageProps} />
        </main>
      ) : (
        <div className={styles.load}>
          <img src='/load.gif' alt='carregando...' />
        </div>
      )}
    </>
  );
};
export default MyApp;
