import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Segment, Message } from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import catchErrors from '../../utils/catchErrors';

const Suscriptores = () => {
  const [suscriptor, setSuscriptor] = useState({
    name: '',
    email: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout;

    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 3500);
    }

    if (Boolean(error)) {
      timeout = setTimeout(() => {
        setError(false);
      }, 3500);
    }

    return () => {
      return clearTimeout(timeout);
    };
  }, [success, error]);

  const handleInputChange = (e) => {
    setSuscriptor({
      ...suscriptor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSusciptionSubmit = async (e) => {
    e.preventDefault();
    try {
      if (suscriptor.name === '' || suscriptor.email === '') {
        return setError('Todos los blancos son requeridos');
      }
      setLoading(true);
      const url = `${baseUrl}/api/mailchimp`;
      const payload = suscriptor;
      await axios.post(url, payload);
      setSuscriptor({
        name: '',
        email: '',
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError('Hubo un error');
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container style={{ margin: '2rem 0 ' }}>
      <Segment color="black" inverted>
        <h3>Recibe notificaciones por correo electrónico</h3>
        <Form
          error={Boolean(error)}
          success={success}
          onSubmit={handleSusciptionSubmit}
        >
          <Message error content={error} />
          <Message success content="Te has suscrito exitosamente" />
          <Form.Group widths="equal">
            <Form.Input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={suscriptor.name}
              placeholder="Tu nombre"
              required
            />

            <Form.Input
              onChange={handleInputChange}
              type="email"
              name="email"
              value={suscriptor.email}
              placeholder="Tu correo electrónico"
              required
            />
          </Form.Group>
          <Button loading={loading} type="submit" content="Suscribirme" />
        </Form>
      </Segment>
    </Container>
  );
};

export default Suscriptores;
