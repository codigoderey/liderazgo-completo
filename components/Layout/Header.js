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

  const [mobile, setMobile] = useState(false);

  const justUser = user && user.role === 'usuario';
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'administrador';
  const isRootOrAdmin = isRoot || isAdmin;

  const isActive = (route) => {
    return route === router.pathname;
  };

  const toggleMenu = () => {
    setMobile((prev) => !prev);
    console.log(mobile);
  };

  if (justUser) {
    return (
      <>
        <Menu
          className="menu-toggle"
          onClick={toggleMenu}
          secondary
          style={{ marginTop: '1rem' }}
        >
          <Container>
            <Menu.Item>
              <Icon
                name="bars"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
            </Menu.Item>
          </Container>
        </Menu>
        <Menu
          className={`${mobile ? 'show' : 'hide-items'}`}
          stackable
          secondary
          style={{ marginTop: '1rem' }}
        >
          <Container>
            <Link href="/">
              <Menu.Item
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                active={isActive('/')}
              >
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
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
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

            <Link href="/lecturas/lista">
              <Menu.Item
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                active={isActive('/lecturas/lista')}
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
            <Menu.Menu
              className="fx-d-c float-right"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Menu.Item style={{ fontSize: '1rem' }} onClick={handleLogout}>
                <Icon
                  name="sign-out"
                  size="large"
                  color="black"
                  style={{ marginRight: '.5rem' }}
                />
                SALIR
              </Menu.Item>

              <Link href="/cuenta/admin">
                <Menu.Item
                  onClick={toggleMenu}
                  style={{ fontSize: '1rem' }}
                  active={isActive('/cuenta/admin')}
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
      </>
    );
  } else if (isRootOrAdmin) {
    return (
      <>
        <Menu
          className="menu-toggle"
          onClick={toggleMenu}
          secondary
          style={{ marginTop: '1rem' }}
        >
          <Container>
            <Menu.Item>
              <Icon
                name="bars"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
            </Menu.Item>
          </Container>
        </Menu>
        <Menu
          className={`${mobile ? 'show' : 'hide-items'}`}
          stackable
          secondary
          style={{ marginTop: '1rem' }}
        >
          <Container>
            <Link href="/">
              <Menu.Item
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                active={isActive('/')}
              >
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
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
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

            <Link href="/lecturas/lista">
              <Menu.Item
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                active={isActive('/lecturas/lista')}
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

            <Menu.Menu
              className="fx-d-c float-right"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Menu.Item
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                onClick={handleLogout}
              >
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
                  onClick={toggleMenu}
                  style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
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
              <Link href="/cuenta/admin">
                <Menu.Item
                  onClick={toggleMenu}
                  style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                  active={isActive('/cuenta/admin')}
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
      </>
    );
  } else {
    return (
      <>
        <Menu
          className="menu-toggle"
          onClick={toggleMenu}
          secondary
          style={{ marginTop: '1rem' }}
        >
          <Container>
            <Menu.Item>
              <Icon
                name="bars"
                size="large"
                color="black"
                style={{ marginRight: '.5rem' }}
              />
            </Menu.Item>
          </Container>
        </Menu>
        <Menu
          className={`${mobile ? 'show' : 'hide-items'}`}
          stackable
          secondary
          style={{ marginTop: '1rem' }}
        >
          <Container>
            <Link href="/">
              <Menu.Item
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                active={isActive('/')}
              >
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
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
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

            <Link href="/lecturas/lista">
              <Menu.Item
                onClick={toggleMenu}
                style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                active={isActive('/lecturas/lista')}
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

            <Menu.Menu
              className="fx-d-c float-right"
              style={{ display: 'flex' }}
            >
              <Link href="/ingresar">
                <Menu.Item
                  style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                  onClick={toggleMenu}
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
                  style={{ fontSize: '1rem', alignSelf: 'flex-start' }}
                  onClick={toggleMenu}
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
      </>
    );
  }
};

export default Header;
