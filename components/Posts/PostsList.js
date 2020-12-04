import {
  Container,
  List,
  Label,
  Segment,
  Divider,
  Button,
} from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';
import Link from 'next/link';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const PostsList = ({ posts, user }) => {
  const router = useRouter();

  if (posts.length === 0)
    return (
      <Container style={{ margin: '2rem 0' }}>
        <p>No hay lecturas por el momento</p>
      </Container>
    );

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
    <Container style={{ marginBottom: '2rem' }}>
      {posts.map((post) => {
        return post && post.archive === false ? (
          <Segment key={post._id} style={{ marginTop: '2rem' }}>
            <Label style={{ marginBottom: '.5rem' }}>
              Categoría
              <Label.Detail>{post.category}</Label.Detail>
            </Label>
            <List style={{ margin: '.2rem 0 0 .2rem' }}>
              <List.Item>
                <List.Content>
                  <List.Header>{post.title}</List.Header>
                  <span style={{ fontSize: 12 }}>
                    Publicado en {formatDate(post.createdAt)} por{' '}
                    <a
                      style={{ color: 'red' }}
                      href={
                        user && user._id === post.postBy._id
                          ? '/cuenta'
                          : `/usuario?_id=${post.postBy._id}`
                      }
                    >
                      {post.postBy.name}
                    </a>
                  </span>
                  <List.Description>{post.blurb}</List.Description>
                </List.Content>
              </List.Item>
            </List>
            <Link href={`/lectura?slug=${post.slug}`}>
              <Button color="blue" style={{ marginTop: '1rem' }}>
                Leer
              </Button>
            </Link>
            {user === undefined
              ? null
              : user.name === post.postBy.name && (
                  <>
                    <Divider />
                    <a href={`/editar?slug=${post.slug}`}>Editar</a>
                  </>
                )}
            {user === undefined
              ? null
              : user.name === post.postBy.name && (
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
        ) : null;
      })}
    </Container>
  );
};

export default PostsList;
