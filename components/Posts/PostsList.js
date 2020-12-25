import { Container, List, Label, Segment, Button } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';
import Link from 'next/link';

const PostsList = ({ posts, user }) => {
  if (posts.length === 0)
    return (
      <Container style={{ margin: '2rem 0' }}>
        <p>No hay lecturas por el momento</p>
      </Container>
    );

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
                          ? '/cuenta/admin'
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
            <Link href={`/lecturas/lectura?slug=${post.slug}`}>
              <Button color="blue" style={{ marginTop: '1rem' }}>
                Leer
              </Button>
            </Link>
          </Segment>
        ) : null;
      })}
    </Container>
  );
};

export default PostsList;
