import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Entry from './Entry';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import style from './Entry.css';
import Server from 'webpack-dev-server';
import { GuestbookProvider } from '../../context/GuestbookProvider';
import App from '../../App';

jest.mock('../../services/entries.js', () => {
  const userObj = {
    email: `bingo@bango.bongo`,
    password: 'password',
  };

  return {
    createEntry: function ({ entry }) {
      return [
        {
          id: 783,
          guest_id: '51954f56-08db-400c-ae7f-538b2bc23b4e',
          content: 'adawewae',
          created_at: '2022-05-16T23:46:46.297443+00:00',
        },
      ];
    },
  };
});

const server = setupServer(
  rest.get('https://ezwbsacoojmonmiqffad.supabase.co', (req, res, ctx) => {
    return () => {};
  })
);

describe('Entry', () => {
  test.skip('should return a react object with entry content, email and date', async () => {
    render(
      <MemoryRouter intialEntries={['/guestbook']}>
        <GuestbookProvider>
          <App />
        </GuestbookProvider>
      </MemoryRouter>
    );

    await screen.findByText(/guestbook/i);
  });
});
