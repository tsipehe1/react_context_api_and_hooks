import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Home } from '.';
//mockar para nao ser preciso fazer x chamadas a uma api externa por exemplo
const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'title1',
            body: 'body1',
            url: 'https://via.placeholder.com/600/92c952',
          },
          {
            userId: 2,
            id: 2,
            title: 'title2',
            body: 'body2',
            url: 'https://via.placeholder.com/600/92c952',
          },
          {
            userId: 3,
            id: 3,
            title: 'title3',
            body: 'body3',
            url: 'https://via.placeholder.com/600/92c952',
          },
        ]),
      );
    },
  ),
  rest.get(
    'https://jsonplaceholder.typicode.com/photos',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            albumId: 1,
            id: 1,
            title: 'accusamus beatae ad facilis cum similique qui sunt',
            url: 'https://via.placeholder.com/600/92c952',
            thumbnailUrl: 'https://via.placeholder.com/150/92c952',
          },
          {
            albumId: 1,
            id: 2,
            title: 'reprehenderit est deserunt velit ipsam',
            url: 'https://via.placeholder.com/600/771796',
            thumbnailUrl: 'https://via.placeholder.com/150/771796',
          },
          {
            albumId: 1,
            id: 3,
            title: 'officia porro iure quia iusto qui ipsa ut modi',
            url: 'https://via.placeholder.com/600/24f355',
            thumbnailUrl: 'https://via.placeholder.com/150/24f355',
          },
        ]),
      );
    },
  ),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  //antes dos tests
  beforeAll(() => {
    server.listen();
  });

  //depois de cada test
  afterEach(() => {
    server.resetHandlers();
  });

  //no final de todos os tests
  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nao existem posts');

    await waitForElementToBeRemoved(noMorePosts);

    screen.debug();
  });
});
