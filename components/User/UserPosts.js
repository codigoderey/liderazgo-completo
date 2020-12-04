import React from 'react';
import { Container, List, Label, Segment, Divider } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

const PostList = ({ posts, usuario }) => {
  if (posts.length === 0)
    return (
      <Container style={{ margin: '2rem 0' }}>
        <p>No hay lecturas por el momento</p>
      </Container>
    );
  return (
    <Container style={{ marginBottom: '2rem' }}>
      <Segment style={{ marginTop: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>Escritos por {usuario.name}</h1>
      </Segment>

      {posts.map((post) => (
        <Segment key={post._id} style={{ marginTop: '2rem' }}>
          <a href={`/lectura?slug=${post.slug}`}>
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
        </Segment>
      ))}
    </Container>
  );
};

export default PostList;
