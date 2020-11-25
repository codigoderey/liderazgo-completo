import { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Form,
  Message,
  TextArea,
  Modal,
  Header,
  Segment,
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import formatDate from '../../utils/formatDate';
import catchErrors from '../../utils/catchErrors';
import { useRouter } from 'next/router';

const PostComments = ({ user, _id, post, comments }) => {
  if (!user)
    return (
      <Message warning>
        <a href="/registrarme">
          Crea una cuenta para ver comentarios comentar y otros beneficios
        </a>
      </Message>
    );
  const router = useRouter();

  // estado comentario inicail
  const [newComment, setNewComment] = useState({
    _id,
    user: user._id || null,
    text: '',
  });

  // handle post request states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(String);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let timeout;

    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    if (Boolean(error)) {
      timeout = setTimeout(() => {
        setError(false);
      }, 2000);
    }

    return () => {
      return clearTimeout(timeout);
    };
  }, [success, error]);

  // handle initial comment input change
  const handleInputChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit initial comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      if (newComment.text === '') {
        return setError('No se ha registrado comentario');
      }
      setLoading(true);
      const url = `${baseUrl}/api/comentarios`;
      const payload = newComment;
      await axios.post(url, payload);
      setNewComment({
        _id,
        user: user._id,
        text: '',
      });
      setSuccess(true);
      router.push(`/lectura?_id=${_id}`);
    } catch (error) {
      console.error(error);
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  // handle editar comments
  const [comentarioEditar, setComentarioEditar] = useState({
    _id: post._id,
    user: user._id || null,
    text: '',
  });

  const [commentIndex, setCommentIndex] = useState(Number);

  const handleEditarComment = (index) => {
    setModalOpen(true);
    setComentarioEditar(comments[index]);
    setCommentIndex(index);
  };

  const handleInputEditarChange = (e) => {
    setComentarioEditar({
      ...comentarioEditar,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditarCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comentarioEditar.text === '') {
        return setError('No se ha registrado comentario');
      }
      setLoading(true);
      const url = `${baseUrl}/api/comentarios`;
      const query = post._id;
      const payload = comentarioEditar;
      await axios.put(url, { query, payload, commentIndex });
      setModalOpen(false);
      setComentarioEditar({
        _id,
        user: user._id,
        text: '',
      });
      setSuccess(true);
      router.push(`/lectura?_id=${_id}`);
    } catch (error) {
      console.error(error);
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        success={success}
        error={Boolean(error)}
        loading={loading}
        id="comment"
        onSubmit={handleSubmitComment}
      >
        <Message error content={error} />
        <Message success content="Añadido correctamente" />
        <Form.Field>
          <TextArea
            placeholder="Escribe tu comentario"
            onChange={handleInputChange}
            name="text"
            value={newComment.text}
          />
        </Form.Field>
        <Button type="submit" content="Comentar" />
      </Form>

      {/* modal para actualizar el comentario */}
      {comentarioEditar && (
        <Modal open={modalOpen}>
          <Header>Actualiza tu comentario</Header>
          <Header.Content>
            <Form onSubmit={handleEditarCommentSubmit}>
              <Form.Field>
                <TextArea
                  placeholder="Escribe tu comentario"
                  onChange={handleInputEditarChange}
                  name="text"
                  value={comentarioEditar.text}
                />
              </Form.Field>
              <Modal.Actions>
                <Button
                  color="red"
                  content="Cancelar"
                  onClick={() => setModalOpen(false)}
                />
                <Button type="submit" content="Actualizar" />
              </Modal.Actions>
            </Form>
          </Header.Content>
        </Modal>
      )}
      <div style={{ margin: '1rem 0' }}>
        {comments
          .map((comment, index) => (
            <Segment color="grey" as="div" key={index}>
              <div>
                Escrito por {comment.user.name} en {formatDate(comment.date)}
                <Divider style={{ margin: '.5rem' }} />
              </div>
              <div>
                <p>{comment.text}</p>
              </div>
              <div>
                {user.name === comment.user.name && (
                  <Button
                    style={{ margin: '.5rem 0 0 0' }}
                    content="Editar"
                    size="mini"
                    onClick={() => handleEditarComment(index)}
                  />
                )}
              </div>
            </Segment>
          ))
          .reverse()}
      </div>
    </>
  );
};

export default PostComments;
