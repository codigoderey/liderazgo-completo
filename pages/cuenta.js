import Head from 'next/head';
import { Container, Segment } from 'semantic-ui-react';
import HeaderCuenta from '../components/Cuenta/HeaderCuenta';
import PermisosCuenta from '../components/Cuenta/PermisosCuenta';
import BookMarks from '../components/Cuenta/BookMarks';

const Cuenta = ({ user }) => {
  return (
    <>
      <Head>
        <title>
          Panel de Administración - {user.name} | Liderazgo Completo
        </title>
      </Head>
      <HeaderCuenta user={user} />
      <Container>
        <Segment style={{ marginTop: '1rem' }}>
          <h1 style={{ textAlign: 'center' }}>Panel de Administración</h1>
        </Segment>
        <BookMarks user={user} />
        {user.role === 'root' && <PermisosCuenta user={user} />}
      </Container>
    </>
  );
};

export default Cuenta;
