import client from '@mailchimp/mailchimp_marketing';

export default async (req, res) => {
  try {
    const { name, email } = req.body;

    client.setConfig({
      apiKey: process.env.MAILCHIMP,
      server: 'us7',
    });

    const run = async () => {
      const response = await client.lists.addListMember('c6dafebd83', {
        email_address: email,
        status: 'transactional',
        merge_fields: { FNAME: name },
      });
    };

    run();

    res.status(200).send('Suscriptor añadido correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};
