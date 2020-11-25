import React, { useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Container, Icon, Menu } from 'semantic-ui-react';
import { handleLogout } from '../../utils/auth';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = ({ user }) => {
  // use router to define path names and active links
  const router = useRouter();

  const justUser = user && user.role === 'usuario';
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'administrador';
  const isRootOrAdmin = isRoot || isAdmin;

  const isActive = (route) => {
    return route === router.pathname;
  };

  if (justUser) {
    return (
      <Menu stackable secondary style={{ marginTop: '1rem' }}>
        <Container>
          <Link href="/">
            <Menu.Item style={{ fontSize: '1rem' }} active={isActive('/')}>
              <Icon
                name="home"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              INICIO
            </Menu.Item>
          </Link>

          <Link href="/nosotros">
            <Menu.Item
              style={{ fontSize: '1rem' }}
              name="about"
              active={isActive('/nosotros')}
            >
              <Icon
                name="info"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              NOSOTROS
            </Menu.Item>
          </Link>

          <Link href="/lecturas">
            <Menu.Item
              style={{ fontSize: '1rem' }}
              active={isActive('/lecturas')}
            >
              <Icon
                name="book"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              LECTURAS
            </Menu.Item>
          </Link>
          <Menu.Menu position="right">
            <Menu.Item style={{ fontSize: '1rem' }} onClick={handleLogout}>
              <Icon
                name="sign-out"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              SALIR
            </Menu.Item>

            <Link href="/cuenta">
              <Menu.Item
                style={{ fontSize: '1rem' }}
                active={isActive('/cuenta')}
              >
                <Icon
                  name="user"
                  size="large"
                  color="black"
                  style={{ marginRight: '.5rem' }}
                />
                {user.name}
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  } else if (isRootOrAdmin) {
    return (
      <Menu stackable secondary style={{ marginTop: '1rem' }}>
        <Container>
          <Link href="/">
            <Menu.Item style={{ fontSize: '1rem' }} active={isActive('/')}>
              <Icon
                name="home"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              INICIO
            </Menu.Item>
          </Link>

          <Link href="/nosotros">
            <Menu.Item
              style={{ fontSize: '1rem' }}
              name="nosotros"
              active={isActive('/nosotros')}
            >
              <Icon
                name="info"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              NOSOTROS
            </Menu.Item>
          </Link>

          <Link href="/lecturas">
            <Menu.Item
              style={{ fontSize: '1rem' }}
              active={isActive('/lecturas')}
            >
              <Icon
                name="book"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              LECTURAS
            </Menu.Item>
          </Link>

          <Menu.Menu position="right">
            <Menu.Item style={{ fontSize: '1rem' }} onClick={handleLogout}>
              <Icon
                name="sign-out"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              SALIR
            </Menu.Item>
            <Link href="/crear">
              <Menu.Item
                style={{ fontSize: '1rem' }}
                active={isActive('/crear')}
              >
                <Icon
                  name="plus"
                  size="large"
                  color="black"
                  style={{ marginRight: '.5rem' }}
                />
                CREAR
              </Menu.Item>
            </Link>
            <Link href="/cuenta">
              <Menu.Item
                style={{ fontSize: '1rem' }}
                active={isActive('/cuenta')}
              >
                <Icon
                  name="user"
                  size="large"
                  color="black"
                  style={{ marginRight: '.5rem' }}
                />
                {user.name}
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  } else {
    return (
      <Menu stackable secondary style={{ marginTop: '1rem' }}>
        <Container>
          <Link href="/">
            <Menu.Item style={{ fontSize: '1rem' }} active={isActive('/')}>
              <Icon
                name="home"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              INICIO
            </Menu.Item>
          </Link>

          <Link href="/nosotros">
            <Menu.Item
              style={{ fontSize: '1rem' }}
              name="nosotros"
              active={isActive('/nosotros')}
            >
              <Icon
                name="info"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              NOSOTROS
            </Menu.Item>
          </Link>

          <Link href="/lecturas">
            <Menu.Item
              style={{ fontSize: '1rem' }}
              active={isActive('/lecturas')}
            >
              <Icon
                name="book"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
              LECTURAS
            </Menu.Item>
          </Link>

          <Menu.Menu position="right">
            <Link href="/ingresar">
              <Menu.Item
                style={{ fontSize: '1rem' }}
                active={isActive('/ingresar')}
              >
                <Icon
                  name="sign-in"
                  size="large"
                  color="black"
                  style={{ marginRight: '.5rem' }}
                />
                INGRESA
              </Menu.Item>
            </Link>
            <Link href="/registrarme">
              <Menu.Item
                style={{ fontSize: '1rem' }}
                active={isActive('/registrarme')}
              >
                <Icon
                  name="signup"
                  size="large"
                  color="black"
                  style={{ marginRight: '.5rem' }}
                />
                CREA CUENTA
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
};

export default Header;
