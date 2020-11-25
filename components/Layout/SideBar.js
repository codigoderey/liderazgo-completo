import React from 'react';
import { Container } from 'semantic-ui-react';
import categorias from '../../utils/categories';
import Categorias from '../../components/Posts/Categorias';
import PostsRecent from '../../components/Posts/PostsRecent';

const SideBar = () => {
  return (
    <Container style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Categorias categorias={categorias} />
      <PostsRecent />
    </Container>
  );
};

export default SideBar;
