import React from 'react';
import { Container, List, Label, Segment, Divider } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

const UserBookmarks = ({ usuario }) => {
  return (
    <Container style={{ marginBottom: '2rem' }}>
      <Segment style={{ marginTop: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>Guardados por {usuario.name}</h1>
      </Segment>

      {usuario.bookmarked.map((post) => (
        <Segment key={post._id} style={{ marginTop: '2rem' }}>
          <a href={`/lectura?_id=${post.post._id}`}>
            <Label>
              Categoría
              <Label.Detail>{post.post.category}</Label.Detail>
            </Label>
            <List style={{ margin: '.2rem 0 0 .2rem' }}>
              <List.Item>
                <List.Content>
                  <List.Header>{post.post.title}</List.Header>
                  <span style={{ fontSize: 12 }}>
                    Publicado en {formatDate(post.post.createdAt)}
                  </span>
                  <List.Description>{post.post.blurb}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </a>
        </Segment>
      ))}
    </Container>
  );
};

export default UserBookmarks;
