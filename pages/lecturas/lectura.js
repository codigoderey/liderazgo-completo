import React from 'react';
import axios from 'axios';
import { Grid, Container } from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import PostTemplate from '../../components/Posts/PostTemplate';
import SideBar from '../../components/Layout/SideBar';

const PostPage = ({ post, user }) => {
  return (
    <>
      <Container>
        <Grid stackable columns={2}>
          <Grid.Column width={11}>
            <PostTemplate user={user} post={post} />
          </Grid.Column>
          <Grid.Column width={5}>
            {' '}
            <SideBar />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

PostPage.getInitialProps = async ({ query: { slug } }) => {
  const url = `${baseUrl}/api/lectura`;
  const payload = { params: { slug } };
  const response = await axios.get(url, payload);
  return { post: response.data };
};

export default PostPage;
