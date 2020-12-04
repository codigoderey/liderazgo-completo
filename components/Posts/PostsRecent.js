import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';

const PostsRecent = () => {
  let count = 1;

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    // fetch data on server
    const url = baseUrl;

    // return response data as an object
    const response = await axios.get(`${url}/api/lecturas`);

    // NOTE: the object will merge with existing props
    setPosts(response.data);
  };

  return (
    <>
      <h3>Publicaciones recientes</h3>
      <ul>
        {posts
          ? posts
              .map((post) => (
                <li
                  key={post._id}
                  style={{ listStyle: 'none', margin: '0 0 .5rem 0' }}
                >
                  <Link key={count + 1} href={`/lectura?slug=${post.slug}`}>
                    {post.title}
                  </Link>
                </li>
              ))
              .splice(0, 5)
          : null}
      </ul>
    </>
  );
};

export default PostsRecent;
