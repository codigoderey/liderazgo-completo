import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({ children, user }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link rel="stylesheet" type="text/css" href="/globals.css" />
        <title>RASAE Project</title>
      </Head>
      <Header user={user} />
      <main role="main" id="start">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
