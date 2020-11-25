import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// sun editor import
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import axios from 'axios';
import { Form, Button, Container, Message } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import categories from '../utils/categories';
import catchErrors from '../utils/catchErrors';
import Header from '../components/Create/Header';

const Editar = ({ post }) => {
  const router = useRouter();

  const [content, setContent] = useState('');

  const [updatedPost, setUpdatedPost] = useState({
    _id: post._id,
    category: post.category,
    title: post.title,
    blurb: post.blurb,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(String);

  const handleInputChange = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (e) => {
    setContent(e);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        updatedPost.title === '' ||
        updatedPost.blurb === '' ||
        content === ''
      ) {
        return setError('Todos los blancos son requeridos');
      } else if (
        !updatedPost.category ||
        updatedPost.category === 'Selecciona una categoría'
      ) {
        return setError('Por favor selecciona una categoría');
      }
      setLoading(true);
      const url = `${baseUrl}/api/lecturas`;
      const newContent = {
        _id: updatedPost._id,
        title: updatedPost.title,
        blurb: updatedPost.blurb,
        category: updatedPost.category,
        content: content,
      };
      const payload = newContent;
      await axios.put(url, payload);
      setSuccess(true);
      router.push(`${baseUrl}/lectura?_id=${updatedPost._id}`);
    } catch (error) {
      console.error(error.message);
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edita tu publicación | Liderazgo Completo</title>
      </Head>
      <Header action="Edita" />

      {/* Create new post */}
      <Container>
        <Form
          onSubmit={handleFormSubmit}
          loading={loading}
          success={success}
          error={Boolean(error)}
        >
          <Message
            success
            icon="check"
            header="Perfecto!"
            content="Se ha añadido el artículo exitosamente"
          />
          <Message
            error
            icon="question"
            header="Hubo un error!"
            content={error}
          />
          <Form.Field>
            <label>Categoría</label>
            <select name="category" onChange={handleInputChange}>
              {categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Título</label>
            <Form.Input
              name="title"
              onChange={handleInputChange}
              value={updatedPost.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Resumen</label>
            <Form.Input
              name="blurb"
              onChange={handleInputChange}
              value={updatedPost.blurb}
            />
          </Form.Field>
          {/* <Form.Field>
            <label>Contenido</label>
            <Form.TextArea
              name="content"
              onChange={handleInputChange}
              value={updatedPost.content}
            />
          </Form.Field> */}
          <SunEditor
            setContents={post.content}
            name="content"
            placeholder="Contenido"
            onChange={handleEditorChange}
            value={content}
            placeholder="Tu contenido aquí"
            setOptions={{
              buttonList: [
                ['formatBlock'],
                ['blockquote'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
                '/', // Line break
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['link', 'image', 'video', 'audio'],
                ['fullScreen'],
              ],
            }}
          />

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

Editar.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/lectura`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { post: response.data };
};

export default Editar;
