import React, { useState, useEffect } from 'react';
import { Container, Divider, Label, Icon, Button } from 'semantic-ui-react';
import PostComment from './PostComment';
import formatDate from '../../utils/formatDate';
import axios from 'axios';
import Head from 'next/head';
import baseUrl from '../../utils/baseUrl';

const PostTemplate = ({ post, user }) => {
  const [color, setColor] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    } else {
      const filteredArray = user.bookmarked.filter((marked) => {
        if (marked.post) {
          return marked.post._id === post._id;
        }
      });

      if (filteredArray.length) {
        if (filteredArray[0].post._id === post._id) {
          setBookmark(true);
        }
      }
    }
  }, []);

  const { category, comments, createdAt, title, content, postBy } = post;

  useEffect(() => {
    if (category === 'administracion') {
      setColor('green');
    } else if (category === 'relaciones') {
      setColor('blue');
    } else if (category === 'salud') {
      setColor('purple');
    } else if (category === 'ambiente') {
      setColor('brown');
    } else if (category === 'estetica') {
      setColor('pink');
    } else {
      setColor("yellow");
    }
  }, []);

  const handleAddBookmark = async () => {
    try {
      setBookmark((bookmark) => !bookmark);
      const url = `${baseUrl}/api/bookmarks`;
      const payload = {
        userId: user._id,
        postId: post._id,
      };
      await axios.post(url, payload);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
    } catch (error) {
      console.error(error.message);
    }
    setBookmark((bookmark) => !bookmark);
    const url = `${baseUrl}/api/bookmarks`;
    const payload = {
      userId: user._id,
      postId: post._id,
    };
    await axios.put(url, payload);
  };

  return (
    <>
      <Head>
        <title>{title} | Liderazgo Completo</title>
      </Head>
      <Container>
        <Label style={{ marginTop: '1rem' }} color={color}>
          Categoría
          <Label.Detail>{category}</Label.Detail>
        </Label>
        <h1 style={{ margin: '.5rem 0 .5rem 0' }}>{title}</h1>
        <span>
          Publicado en {formatDate(createdAt)} por{' '}
          <a
            href={
              user && user._id === postBy._id
                ? '/cuenta/admin'
                : `/usuario?_id=${postBy._id}`
            }
          >
            {postBy.name}
          </a>
        </span>
        <div
          style={{ margin: '1rem 0 1rem 0' }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        {/* likes and questions */}

        {user && !bookmark ? (
          <Button onClick={handleAddBookmark} as="div" labelPosition="right">
            <Button icon>
              <Icon name="bookmark outline" />
              Guardar Lectura
            </Button>
          </Button>
        ) : (
            user && (
              <Button
                onClick={handleRemoveBookmark}
                as="div"
                labelPosition="right"
              >
                <Button icon>
                  <Icon name="bookmark" />
                Lectura guardada
              </Button>
              </Button>
            )
          )}
        {/* likes and questions end */}

        <Divider />
        <h3>Comenta sobre esta publicación</h3>
        <PostComment
          post={post}
          user={user}
          _id={post._id}
          comments={comments}
        />
      </Container>
    </>
  );
};

export default PostTemplate;
