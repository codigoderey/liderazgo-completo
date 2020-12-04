import fetch from 'node-fetch';
import baseUrl from '../baseUrl';
const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const contrasenaActualizada = async ({ name, email }) => {
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
            subject: 'Contraseña actualizada de Liderazgo Completo',
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
                <p><b>${name}<b/>, tu contraseña ha sido actualizada exitosamente.<p/>
                
                <p>Inicia sesión en <a href=${baseUrl}/ingresar>proyectorasae.com<a/>.<p/>

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

export { contrasenaActualizada };
