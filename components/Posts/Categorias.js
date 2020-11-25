import React from 'react';
import Link from 'next/link';
import shortid from 'shortid';

const Categorias = ({ categorias }) => {
  return (
    <>
      <h3>Categorías</h3>
      <ul>
        {categorias.map((cat) => (
          <li
            key={shortid.generate() + 1}
            style={{ listStyle: 'none', margin: '0 0 .5rem 0' }}
          >
            <Link href={`/${cat}`}>
              {cat === 'relaciones'
                ? 'Relaciones'
                : cat === 'estetica'
                ? 'Estética'
                : cat === 'administracion'
                ? 'Administración'
                : cat === 'salud'
                ? 'Salud'
                : cat === 'ambiente'
                ? 'Ambiente'
                : null}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Categorias;
