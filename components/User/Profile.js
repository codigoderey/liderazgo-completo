import React from 'react';
import { Segment, Label, Header, Icon, Container } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

const Profile = ({ usuario }) => {
  const { createdAt, name } = usuario;

  return (
    <Container>
      <Segment secondary inverted color="black">
        <Header inverted textAlign="center" as="h1" icon>
          <Header.Subheader>Perfil de {name}</Header.Subheader>
          <Header.Subheader>
            Registrado desde {formatDate(createdAt)}
          </Header.Subheader>
        </Header>
      </Segment>
    </Container>
  );
};

export default Profile;
