import { Segment, Label, Header, Icon, Container } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

const HeaderCuenta = ({ user }) => {
  return (
    <Container>
      <Segment secondary inverted color="black">
        <Label
          // color="teal"
          size="large"
          ribbon
          icon="privacy"
          style={{ textTransform: 'capitalize' }}
          content={`${user.role === 'usuario' ? 'Usuario regular' : user.role}`}
        />
        <Header inverted textAlign="center" as="h1" icon>
          <Icon name="user" />
          <Header.Subheader>{user.name}</Header.Subheader>
          <Header.Subheader>{user.email}</Header.Subheader>
          <Header.Subheader>
            Registrado desde {formatDate(user.createdAt)}
          </Header.Subheader>
        </Header>
      </Segment>
    </Container>
  );
};

export default HeaderCuenta;
