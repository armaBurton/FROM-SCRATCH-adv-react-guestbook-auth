import { useEffect } from 'react';
import { useGuestbook } from '../../context/GuestbookProvider';
import { getEntries } from '../../services/entries';

export default function Guestbook({ children, ...rest }) {
  const { logout } = useGuestbook();
  const { entries, setEntries, loading, setLoading } = useGuestbook();

  useEffect(() => {
    setLoading(true);

    getEntries()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Guestbook</h1>
      <p>You should only see this page if you're logged in</p>
      <button onClick={logout}>Sign out</button>
      {loading ? (
        <p>Loading entries...</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
          ))}
        </ul>
      )}
    </>
  );
}
