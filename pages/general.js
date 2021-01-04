import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import PostsList from '../components/Posts/PostsList';
import HeroPosts from '../components/Images/HeroPosts';

const General = ({ posts, user }) => {
  return (
    <>
      <Head>
        <title>Categoría - General | Liderazgo Completo</title>
      </Head>
      <HeroPosts />
      <PostsList user={user} posts={posts} />
    </>
  );
};

General.getInitialProps = async () => {
  // fetch data on server
  const url = baseUrl;

  // return response data as an object
  const response = await axios.get(`${url}/api/general`);

  // NOTE: the object will merge with existing props
  return { posts: response.data };
};

export default General;
