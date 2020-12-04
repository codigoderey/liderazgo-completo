import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { Container, Form, Message, Button } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const NuevaContrasena = () => {
  const router = useRouter();

  const [password, setPassword] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timeout;
    if (Boolean(error)) {
      timeout = setTimeout(() => {
        setError(false);
      }, 2000);
    }

    return () => {
      return clearTimeout(timeout);
    };
  }, [error]);

  const hanldeInputChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      if (password.password !== password.confirm_password) {
        return setError('Las contraseñas no son iguales, intenta de nuevo');
      } else if (
        password.email === '' ||
        password.password === '' ||
        password.confirm_password === ''
      ) {
        return setError('Todos los blancos son requeridos');
      }

      setLoading(true);
      const url = `${baseUrl}/api/nuevacontrasena`;
      const payload = password;
      await axios.put(url, payload);

      setSuccess(true);

      router.push('/ingresar');
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
        <title>Ingresa tu nueva contraseña | Liderazgo Completo</title>
      </Head>
      <Container>
        <Message
          icon="privacy"
          header="Ingresa tu nueva contraseña"
          content="Has hecho click en el correo para reiniciar la nueva contraseña"
        />
        <Form
          loading={loading}
          success={success}
          error={Boolean(error)}
          onSubmit={handleSubmitPassword}
        >
          <Message error header="Error" content={error} />
          <Message
            success
            header="Exito"
            content="Tu contraseña se ha actualizado, por favor ingresa con los nuevos credenciales"
          />
          <Form.Input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            value={password.email}
            onChange={hanldeInputChange}
          />
          <Form.Input
            type="password"
            name="password"
            placeholder="Tu nueva contraseña"
            value={password.password}
            onChange={hanldeInputChange}
          />
          <Form.Input
            type="password"
            name="confirm_password"
            placeholder="Confirma tu nueva contraseña"
            value={password.confirm_password}
            onChange={hanldeInputChange}
          />
          <Button type="submit" content="Enviar" />
        </Form>
        <Message>
          Si tu contraseña ha expirado, solicita un nuevo enlace{' '}
          <Link href="/recuperarcontrasena">aquí</Link>
        </Message>
      </Container>
    </>
  );
};

NuevaContrasena.getInitialProps = async ({ query: { token } }) => {
  const url = `${baseUrl}/api/nuevacontrasena`;
  const payload = { params: { token } };
  const response = await axios.get(url, payload);

  return { token: response.data };
};

export default NuevaContrasena;
