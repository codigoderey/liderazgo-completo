import fetch from 'node-fetch';
import baseUrl from '../baseUrl';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

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
            subject: 'Bienvenido a RASAE',
          },
        ],
        from: {
          email: 'noreply@rasaeproject.com',
          name: 'Proyecto Rasae',
        },
        content: [
          {
            type: 'text/html',
            value: `
                <p><b>${name}<b/>, Gracias por ingresar la comunidad RASAE, aquí estamos para servir con lecturas de calidad que aporten valor a tu vida y la de las personas que te rodean.<p/>
                
                <p>Visita <a href=${baseUrl}>proyectorasae.com<a/>.<p/>

                <p>Cordialmente,<p/>
                <p>El equipo de proyecto RASAE<p/>
                `,
          },
        ],
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export { newAccountWelcomeEmail };
