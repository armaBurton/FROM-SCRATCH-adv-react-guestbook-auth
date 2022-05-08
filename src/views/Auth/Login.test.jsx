import {
  getByText,
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getEntries } from '../../services/entries';
import Login from './Login';
import userId from '../../assets/user';
import { userPosts } from '../../assets/posts';
import {
  GuestbookProvider,
  useGuestbook,
} from '../../context/GuestbookProvider';
import App from '../../App';

jest.mock('../../services/user.js', () => {
  return {
    getUser: function () {
      return { email: null };
    },
    signUpUser: function () {
      const userObj = {
        id: '51954f56-08db-400c-ae7f-538b2bc23b4e',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'booger@eater.yum',
        email_confirmed_at: '2022-05-08T20:26:08.536205514Z',
        phone: '',
        last_sign_in_at: '2022-05-08T20:26:08.539015657Z',
        app_metadata: {
          provider: 'email',
          providers: ['email'],
        },
        user_metadata: {},
        identities: [
          {
            id: '51954f56-08db-400c-ae7f-538b2bc23b4e',
            user_id: '51954f56-08db-400c-ae7f-538b2bc23b4e',
            identity_data: {
              sub: '51954f56-08db-400c-ae7f-538b2bc23b4e',
            },
            provider: 'email',
            last_sign_in_at: '2022-05-08T20:26:08.534293407Z',
            created_at: '2022-05-08T20:26:08.534347Z',
            updated_at: '2022-05-08T20:26:08.534351Z',
          },
        ],
        created_at: '2022-05-08T20:26:08.530662Z',
        updated_at: '2022-05-08T20:26:08.540203Z',
      };
      return userObj;
    },
    getEntries: function () {
      return [
        {
          id: 424,
          guest_id: '51954f56-08db-400c-ae7f-538b2bc23b4e',
          content: 'Boogers are the fruit of your nose.',
          created_at: '2022-05-08T22:43:30.185359+00:00',
        },
      ];
    },
    createEntry: function () {
      return [
        {
          id: 424,
          guest_id: '51954f56-08db-400c-ae7f-538b2bc23b4e',
          content: 'Boogers are the fruit of your nose.',
          created_at: '2022-05-08T22:43:30.185359+00:00',
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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login.jsx', () => {
  it('should be a passing test', () => {});

  test('it should redirect an unregistered user from / to /login', async () => {
    render(
      <MemoryRouter>
        <GuestbookProvider>
          <App />
        </GuestbookProvider>
      </MemoryRouter>
    );

    await screen.findByText(/sign in to your account/i);
    let link = screen.getByTestId(/createUser/i);
    userEvent.click(link);
    await screen.findByText(/sign up for an account/i);
    let email = screen.getByTestId(/signUpEmail/i);
    let password = screen.getByTestId(/signUpPassword/i);
    userEvent.type(email, 'booger@eater.yum');
    userEvent.type(password, 'password');
    link = screen.getByTestId(/sign up/i);
    userEvent.click(link);
    await screen.findByText(/booger@eater.yum/i);
    screen.getByText(/guestbook/i);
    link = screen.getByText(/add entry/i);
    let entry = screen.getByTestId(/content/i);
    userEvent.type(entry, 'Boogers are the fruit of your nose.');
    userEvent.click(link);
    await waitForElementToBeRemoved(() => screen.getByText(/loading entries/i));
    await screen.findByText(/boogers are the fruit of your nose/i);
  });
});
