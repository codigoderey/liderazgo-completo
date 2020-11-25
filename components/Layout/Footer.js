import { Container, Divider, Grid } from 'semantic-ui-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0' }}>
      <Container>
        <Grid>
          <Grid.Row style={{ paddingBottom: 0 }}>
            <Grid.Column>
              <h3>Síguenos en las redes</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <img
                width="50"
                src="http://icons.iconarchive.com/icons/limav/flat-gradient-social/512/Facebook-icon.png"
              />
            </Grid.Column>
            <Grid.Column>
              <img
                width="50"
                src="https://maxcdn.icons8.com/Share/icon/Media_Controls/youtube_play1600.png"
              />
            </Grid.Column>
            <Grid.Column>
              <img
                width="50"
                src="http://www.soft32.com/blog/wp-content/uploads/2016/08/spotify_logo.png"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid columns={2} stackable>
          <Grid.Row textAlign="left">
            <Grid.Column>
              <h3 style={{ marginBottom: '.5rem' }}>Liderazgo Completo</h3>
              <p>
                Liderazgo completo es un proyecto de liderazgo que busca
                orientar y educar y guiar a las personas en los diferentes
                aspectos que abarcan nuestro diario vivir con el fin de tomar el
                control y hacer decisiones efectivas conforme a su capacidad.
              </p>
            </Grid.Column>
            <Grid.Column>
              <h3 style={{ marginBottom: '.5rem' }}>Navegación</h3>
              <ul>
                <li style={{ listStyle: 'none', margin: '0 0 0 .5rem' }}>
                  <Link href="/">Inicio</Link>
                </li>
                <li style={{ listStyle: 'none', margin: '0 0 0 .5rem' }}>
                  <Link href="/nosotros">Sobre nosotros</Link>
                </li>
                <li style={{ listStyle: 'none', margin: '0 0 0 .5rem' }}>
                  <Link href="/lecturas">Lecturas</Link>
                </li>
                <li style={{ listStyle: 'none', margin: '0 0 0 .5rem' }}>
                  <Link href="/terminos">Términos de uso</Link>
                </li>
                <li style={{ listStyle: 'none', margin: '0 0 0 .5rem' }}>
                  <Link href="/privacidad">Privacidad</Link>
                </li>
              </ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <p>Proyecto Liderazgo Completo @{new Date().getFullYear()}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
