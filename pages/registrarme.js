import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { Button, Container, Form, Message } from 'semantic-ui-react';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
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
      if (user.name === '' || user.email === '' || user.password === '') {
        return setError('Todos los campos son obligatorios');
      }
      setLoading(true);
      setError('');

      const url = `${baseUrl}/api/registrarme`;
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
        <title>Crea una cuenta | Liderazgo Completo</title>
      </Head>
      <Container>
        <Message
          icon="settings"
          header="Vamos a comenzar"
          content="Crea una cuenta nueva"
        />
        <Form
          loading={loading}
          error={Boolean(error)}
          success={success}
          onSubmit={handleFormSubmit}
        >
          <Message error header="Ooops!" content={error} />
          <Message
            success
            header="Cuenta creada"
            content="Nueva cuenta creada exitosamente"
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
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

          <Button icon="signup" type="submit" content="Crear cuenta" />
        </Form>
        <Message style={{ marginBottom: '2rem' }}>
          Usuario existente? <Link href="login">Inicia sesión aquí</Link>.
        </Message>
      </Container>
    </>
  );
};

export default Register;
