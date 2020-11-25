import Head from 'next/head';
import axios from 'axios';
import { Grid, Container } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import Welcome from '../components/About/Welcome';
import SideBar from '../components/Layout/SideBar';

const About = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Sobre nosotros | Liderazgo Completo</title>
      </Head>
      <Container>
        <Grid stackable columns={2}>
          <Grid.Column width={11}>
            <Welcome />
          </Grid.Column>
          <Grid.Column width={5}>
            <SideBar posts={posts} />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

About.getInitialProps = async () => {
  // fetch data on server
  const url = baseUrl;

  // return response data as an object
  const response = await axios.get(`${url}/api/lecturas`);

  // NOTE: the object will merge with existing props
  return { posts: response.data };
};

export default About;
