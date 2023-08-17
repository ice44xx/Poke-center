import Home from '@/component/home/home';
import Head from 'next/head';

const Index = () => {
  return (
    <>
      <Head>
        <title>Poke Center - @nshcode</title>
      </Head>
      <main>
        <Home />
      </main>
    </>
  );
};

export default Index;
