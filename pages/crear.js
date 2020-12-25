import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// sun editor import
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { Form, Button, Container, Message, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import categories from '../utils/categories';
import catchErrors from '../utils/catchErrors';
import Header from '../components/Create/Header';
import slug from 'slug';

const CreatePost = ({ user }) => {
  const router = useRouter();

  const [content, setContent] = useState('');

  const [publicacion, setPublicacion] = useState({
    title: '',
    blurb: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(String);

  const handleInputChange = (e) => {
    setPublicacion({
      ...publicacion,
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
        publicacion.title === '' ||
        publicacion.blurb === '' ||
        content === ''
      ) {
        return setError('Todos los blancos son requeridos');
      } else if (
        !publicacion.category ||
        publicacion.category === 'Selecciona una categoría'
      ) {
        return setError('Por favor selecciona una categoría');
      }
      setLoading(true);
      const url = `${baseUrl}/api/lecturas`;
      const newContent = {
        title: publicacion.title,
        slug: slug(publicacion.title),
        blurb: publicacion.blurb,
        category: publicacion.category,
        content: content,
        postBy: user._id,
      };
      const payload = newContent;
      await axios.post(url, payload);
      setSuccess(true);
      setPublicacion({
        title: '',
        blurb: '',
      });
      setContent('');
      router.push('/lecturas/lista#start');
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
        <title>Crea tu publicación | Liderazgo Completo</title>
      </Head>
      <Header action="Crea" />

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
            header="Hubo un error, intenta recargar la página!"
            content={error}
          />
          <Form.Field>
            <label>Categoría</label>
            <select name="category" onChange={handleInputChange}>
              <option>Selecciona una categoría</option>
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
              placeholder="Título"
              onChange={handleInputChange}
              value={publicacion.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Resumen</label>
            <TextArea
              name="blurb"
              placeholder="Resumen"
              onChange={handleInputChange}
              value={publicacion.blurb}
            />
          </Form.Field>

          {/* Sun Editor Component */}
          <Form.Field style={{ marginBottom: 0 }}>
            <label>Contenido</label>
          </Form.Field>
          <SunEditor
            height="600"
            setContents={content}
            name="content"
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
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                '/', // Line break
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['link', 'image', 'video', 'audio'],
                /** ['imageGallery'] */ ['fullScreen'],
              ],
            }}
          />

          <Button type="submit">Publicar</Button>
        </Form>
      </Container>
    </>
  );
};

export default CreatePost;
