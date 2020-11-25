import React from 'react';
import formatDate from '../../utils/formatDate';
import {
  Header,
  Icon,
  Segment,
  List,
  Container,
  Label,
} from 'semantic-ui-react';

const BookMarks = ({ user }) => {
  if (user.bookmarked.length === 0) {
    return (
      <Container style={{ marginBottom: '2rem' }}>
        <Header style={{ margin: '4rem 0 1rem 0' }} as="h2">
          <Icon name="bookmark" />
          Lecturas guardadas
        </Header>
        <p>
          No has guardado ninguna lectura, oprime el icono del marcador{' '}
          <Icon name="bookmark" /> para guardar las lecturas que deseas.
        </p>
      </Container>
    );
  }
  return (
    <Container style={{ marginBottom: '2rem' }}>
      <Header style={{ margin: '4rem 0 0 0' }} as="h2">
        <Icon name="bookmark" />
        Lecturas guardadas
      </Header>
      {user.bookmarked.map((mark) => {
        return (
          <Segment key={mark.post._id} style={{ margin: '1rem 0' }}>
            <a href={`/lectura?_id=${mark.post._id}`}>
              <Label>
                Categoría
                <Label.Detail>{mark.post.category}</Label.Detail>
              </Label>
              <List style={{ margin: '.2rem 0 0 .2rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Header>{mark.post.title}</List.Header>
                    <span style={{ fontSize: 12 }}>
                      Publicado en {formatDate(mark.post.createdAt)}
                    </span>
                    <List.Description>{mark.post.blurb}</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </a>
          </Segment>
        );
      })}
    </Container>
  );
};

export default BookMarks;
