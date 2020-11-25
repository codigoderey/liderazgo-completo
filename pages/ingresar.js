import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';

import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import Link from 'next/link';
import { handleLogin } from '../utils/auth';
const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user.email === '' || user.password === '') {
        return setError('Todos los campos son obligatorios');
      }
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/ingresar`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ingresa a tu cuenta | Liderazgo Completo</title>
      </Head>
      <Container>
        <Message icon="privacy" header="Bienvenido" content="Inicia sesión" />
        <Form
          loading={loading}
          error={Boolean(error)}
          success={success}
          onSubmit={handleFormSubmit}
        >
          <Message error header="Ooops!" content={error} />
          <Message
            success
            header="Sesión iniciada"
            content="Has iniciado sesión exitosamente"
          />

          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Correo Electrónico"
            placeholder="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />

          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <Button icon="signup" type="submit" content="Inicia sesión" />
        </Form>
        <Message style={{ marginBottom: '2rem' }}>
          No tienes cuenta?{' '}
          <Link href="/registrarme">Crea una cuenta aquí</Link>.
          <br />
          Olvidaste tu contraseña?{' '}
          <Link href="/recuperarcontrasena">Recupérala aquí</Link>.
        </Message>
      </Container>
    </>
  );
};

export default Register;
