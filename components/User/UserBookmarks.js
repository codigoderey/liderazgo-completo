import React from 'react';
import {
  Container,
  List,
  Label,
  Segment,
  Header,
  Icon,
} from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

const UserBookmarks = ({ usuario }) => {
  return (
    <Container style={{ marginBottom: '2rem' }}>
      {usuario.bookmarked.length == 0 ? (
        <Container style={{ marginBottom: '2rem' }}>
          <Header style={{ margin: '4rem 0 1rem 0' }} as="h2">
            <Icon name="bookmark" />
            Lecturas guardadas
          </Header>
          <p>
            No has escrito nada aún, oprime el enlace crear en el menú de
            navegación para comenzar a publicar.
          </p>
        </Container>
      ) : (
        <>
          <Container style={{ marginBottom: '2rem' }}>
            <Header style={{ margin: '4rem 0 1rem 0' }} as="h2">
              <Icon name="bookmark" />
              Lecturas guardadas
            </Header>
          </Container>
          {usuario.bookmarked.map((post) => (
            <Segment key={post._id} style={{ marginTop: '2rem' }}>
              <a href={`/lecturas/lectura?slug=${post.post.slug}`}>
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
        </>
      )}
    </Container>
  );
};

export default UserBookmarks;
