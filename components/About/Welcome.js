import Link from 'next/link';

import { Container, List } from 'semantic-ui-react';

const Welcome = () => {
  return (
    <Container style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <h1>Bienvenidos a Liderazgo Completo</h1>
      <p>
        Liderazgo Completo es un marco de liderato personal y colectivo cuyos
        desarrollo depende en las siguientes categorías fundamentales de la
        existencia:
      </p>

      <List>
        <Link href="/relaciones">
          <List.Item>
            <List.Icon color="blue" name="arrow right" />
            <List.Content className="blue">Relaciones</List.Content>
          </List.Item>
        </Link>
        <Link href="/administracion">
          <List.Item>
            <List.Icon color="blue" name="arrow right" />
            <List.Content className="blue">Administración</List.Content>
          </List.Item>
        </Link>
        <Link href="/salud">
          <List.Item>
            <List.Icon color="blue" name="arrow right" />
            <List.Content className="blue">Salud</List.Content>
          </List.Item>
        </Link>
        <Link href="/ambiente">
          <List.Item>
            <List.Icon color="blue" name="arrow right" />
            <List.Content className="blue">Ambiente</List.Content>
          </List.Item>
        </Link>
        <Link href="/estetica">
          <List.Item>
            <List.Icon color="blue" name="arrow right" />
            <List.Content className="blue">Estética</List.Content>
          </List.Item>
        </Link>
      </List>
    </Container>
  );
};

export default Welcome;
