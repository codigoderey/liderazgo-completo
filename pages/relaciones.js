import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import PostsList from '../components/Posts/PostsList';
import HeroPosts from '../components/Images/HeroPosts';

const Relaciones = ({ posts, user }) => {
  return (
    <>
      <Head>
        <title>Categoría - Relaciones | Liderazgo Completo</title>
      </Head>
      <HeroPosts />
      <PostsList user={user} posts={posts} />
    </>
  );
};

Relaciones.getInitialProps = async () => {
  // fetch data on server
  const url = baseUrl;

  // return response data as an object
  const response = await axios.get(`${url}/api/relaciones`);

  // NOTE: the object will merge with existing props
  return { posts: response.data };
};

export default Relaciones;
