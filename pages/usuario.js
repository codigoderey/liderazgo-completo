import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import Profile from '../components/User/Profile';
import PostsList from '../components/User/UserPosts';
import UserBookmarks from '../components/User/UserBookmarks';

const Usuario = ({ userPosts }) => {
  return (
    <>
      {' '}
      <Head>
        <title>Perfil de {userPosts.user.name} | Liderazgo Completo</title>
      </Head>
      <Profile usuario={userPosts.user} />
      <PostsList posts={userPosts.userPosts} usuario={userPosts.user} />
      <UserBookmarks usuario={userPosts.user} />
    </>
  );
};

Usuario.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/user`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { userPosts: response.data };
};

export default Usuario;
