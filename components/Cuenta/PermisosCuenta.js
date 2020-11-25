import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import { Header, Checkbox, Table, Icon } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

const PermisosCuenta = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <Header style={{ margin: '4rem 0 0 1rem' }} as="h2">
        <Icon name="settings" />
        Permisos de usuario
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user) => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const UserPermission = ({ user }) => {
  const [admin, setAdmin] = useState(user.role === 'administrador');

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    handleUpdatePermission();
  }, [admin]);

  const handleChangePermission = () => {
    setAdmin((prevState) => !prevState);
  };

  const handleUpdatePermission = async () => {
    const url = `${baseUrl}/api/cuenta`;
    const payload = {
      _id: user._id,
      role: admin ? 'administrador' : 'usuario',
    };
    await axios.put(url, payload);
  };

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
      <Table.Cell style={{ width: 128 }}>
        {admin ? 'administrador' : 'usuario'}
      </Table.Cell>
    </Table.Row>
  );
};

export default PermisosCuenta;
