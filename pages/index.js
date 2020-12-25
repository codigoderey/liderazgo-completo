import HeroHome from '../components/Images/HeroHome';
import Welcome from '../components/Home/Welcome';
import Suscriptores from '../components/MailChimp/Suscriptores';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Liderazgo Completo | Tu recurso de información y crecimiento
        </title>
      </Head>
      <HeroHome />
      <Welcome />
      <Suscriptores />
    </>
  );
};

export default Home;
