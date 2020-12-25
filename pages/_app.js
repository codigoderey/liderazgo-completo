import App from 'next/app';
import axios from 'axios';
import { Router } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { parseCookies, destroyCookie } from 'nookies';
import Layout from '../components/Layout/Layout';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';
import '../public/globals.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // get token from authenticated user
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute =
        ctx.pathname === '/cuenta/admin' ||
        ctx.pathname === '/crear' ||
        ctx.pathname === '/usuario';
      // || ctx.pathname === '/posts';
      if (isProtectedRoute) {
        redirectUser(ctx, '/ingresar');
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/cuenta`;
        const response = await axios.get(url, payload);
        const user = response.data;
        const isRoot = user.role === 'root';
        const isAdmin = user.role === 'administrador';

        // if auth but not role or root, redirect from /create page
        const isNotPermittedToCreate =
          !(isRoot || isAdmin) && ctx.pathname === '/crear';

        if (isNotPermittedToCreate) {
          redirectUser(ctx, '/');
        }

        pageProps.user = user;
      } catch (error) {
        console.error(error, 'Error al obtener al usuario');
        // throw out invalid token
        destroyCookie(ctx, 'token');
        // redirect to login page
        redirectUser(ctx, '/ingresar');
      }
    }

    return { pageProps: pageProps };
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout);
  }

  syncLogout = (event) => {
    if ((event.key = 'logout')) {
      Router.push('/ingresar');
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
