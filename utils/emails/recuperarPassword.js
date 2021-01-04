import fetch from 'node-fetch';
import baseUrl from '../baseUrl';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const resetPasword = async ({ name, email, resetUrl }) => {
  try {
    await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email,
              },
            ],
            subject: 'Recupera tu contraseña de Liderazgo Completo',
          },
        ],
        from: {
          email: 'noreply@liderazgocompleto.com',
          name: 'Liderazgo Completo',
        },
        content: [
          {
            type: 'text/html',
            value: `
                <p><b>${name}<b/>, estás recibido este mensaje porque solicitaste reiniciar tu contraseña para ingresar a <a href=${baseUrl}>liderazgocompleto.com<a/>.<p/>
                
                <p>Por favor, oprime el siguiente enlace para re iniciar tu contraseña.<p/>

                <a href="${resetUrl}">Reiniciar mi contraseña<a/>

                <p>Cordialmente,<p/>
                <p>El equipo de proyecto Liderazgo Completo<p/>
                `,
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

const newAccountWelcomeEmail = async ({ name, email }) => {
  try {
    await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email,
              },
            ],
            subject: 'Bienvenido a Liderazgo Completo',
          },
        ],
        from: {
          email: 'noreply@liderazgocompleto.com',
          name: 'Proyecto Liderazgo Completo',
        },
        content: [
          {
            type: 'text/html',
            value: `
                <p><b>${name}<b/>, Gracias por ingresar la comunidad Liderazgo Completo, aquí estamos para servir con lecturas de calidad que aporten valor a tu vida y la de las personas que te rodean.<p/>
                
                <p>Visita <a href="http://localhost:3000">liderazgocompleto.com<a/>.<p/>
                
                <p>Por favor, oprime el siguiente enlace para re iniciar tu contraseña.<p/>

                <p>Cordialmente,<p/>
                <p>El equipo de proyecto Liderazgo Completo<p/>
                `,
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export { resetPasword, newAccountWelcomeEmail };
