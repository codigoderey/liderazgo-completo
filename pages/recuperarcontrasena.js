import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Form, Message, Button, Container } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const RecuperarContrasena = () => {
  const router = useRouter();

  const [email, setEmail] = useState({
    email: '',
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
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    try {
      if (email.email === '') {
        return setError('Ingresa un correo electrónico');
      }
      setLoading(true);
      const url = `${baseUrl}/api/restablecercontrasena`;
      const payload = email;
      await axios.post(url, payload);
      router.push('/ingresar');
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
        <title>Ingresa tu correo electrónico | Liderazgo Completo</title>
      </Head>
      <Container>
        <Message
          icon="privacy"
          header="Recuperar contraseña"
          content="Escribe tu correo electrónico recibirás un enlace para re establecer tu contraseña"
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
            header="Solicitud exitosa"
            content="Verifica tu correo electrónico "
          />
          <Form.Input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            value={email.email}
            onChange={hanldeInputChange}
          />
          <Button type="submit" content="Enviar" />
        </Form>
        <Message style={{ marginBottom: '2rem' }}>
          Te acordaste? <Link href="/ingresar">Inicia sesión aquí</Link>.
        </Message>
      </Container>
    </>
  );
};

export default RecuperarContrasena;
