import Head from 'next/head';
import {
  Container,
  Segment,
  Label,
  List,
  Header,
  Icon,
  Divider,
  Button,
} from 'semantic-ui-react';
import HeaderCuenta from '../../components/Cuenta/HeaderCuenta';
import PermisosCuenta from '../../components/Cuenta/PermisosCuenta';
import BookMarks from '../../components/Cuenta/BookMarks';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import formatDate from '../../utils/formatDate';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Cuenta = ({ user, userPosts }) => {
  const router = useRouter();
  // obteniendo todas las publicaciones del usuario
  const posts = userPosts.filter((post) => {
    if (post.postBy) {
      return post.postBy.name === user.name;
    }
  });

  // definiendo los roles de usuario
  const isAdminOrRoot = user.role === 'administrador' || user.role === 'root';

  const eliminarElPost = async (postId) => {
    try {
      const url = `${baseUrl}/api/lectura`;
      const token = cookie.get('token');
      const payload = {
        params: { postId },
        headers: { Authorization: token },
      };
      await axios.put(url, payload);
      router.reload(window.location.pathname);
    } catch (error) {
      console.error(error);
    }
  };

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
        {/* user publications */}
        <>
          {isAdminOrRoot && posts.length === 0 ? (
            <Container style={{ marginBottom: '2rem' }}>
              <Header style={{ margin: '4rem 0 1rem 0' }} as="h2">
                <Icon name="edit" />
                Mis escritos
              </Header>
              <p>
                No has escrito nada aún, oprime el enlace <strong>CREAR</strong>{' '}
                en el menú de navegación para comenzar a publicar.
              </p>
            </Container>
          ) : (
            <>
              <Container style={{ marginBottom: '2rem' }}>
                <Header style={{ margin: '4rem 0 1rem 0' }} as="h2">
                  <Icon name="edit" />
                  Mis escritos
                </Header>
              </Container>
              {posts.map((post) => (
                <Segment key={post._id} style={{ marginTop: '2rem' }}>
                  <a href={`/lecturas/lectura?slug=${post.slug}`}>
                    <Label>
                      Categoría
                      <Label.Detail>{post.category}</Label.Detail>
                    </Label>
                    <List style={{ margin: '.2rem 0 0 .2rem' }}>
                      <List.Item>
                        <List.Content>
                          <List.Header>{post.title}</List.Header>
                          <span style={{ fontSize: 12 }}>
                            Publicado en {formatDate(post.createdAt)}
                          </span>
                          <List.Description>{post.blurb}</List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                  </a>
                  {user === undefined
                    ? null
                    : user.name === post.postBy.name && (
                        <>
                          <Divider />
                          {console.log(post._id)}
                          <a href={`/lecturas/editar?slug=${post.slug}`}>
                            Editar
                          </a>
                        </>
                      )}
                  {user && (
                    <>
                      <Divider />
                      <Button
                        color="red"
                        inverted
                        onClick={() => eliminarElPost(post._id)}
                      >
                        Borrar
                      </Button>
                    </>
                  )}
                </Segment>
              ))}
            </>
          )}
        </>
        {/* user bookmarks */}
        <BookMarks user={user} />
        {user.role === 'root' && <PermisosCuenta user={user} />}
      </Container>
    </>
  );
};

Cuenta.getInitialProps = async () => {
  // fetch data on server
  const url = baseUrl;
  // return response data as an object
  const response = await axios.get(`${url}/api/lecturas`);
  return { userPosts: response.data };
};

export default Cuenta;
