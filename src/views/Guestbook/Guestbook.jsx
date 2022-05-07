import { useEffect } from 'react';
import { useGuestbook } from '../../context/GuestbookProvider';
import { getEntries } from '../../services/entries';
import style from './Guestbook.css';

export default function Guestbook({ children, ...rest }) {
  const { logout } = useGuestbook();
  const { user, entries, setEntries, loading, setLoading } = useGuestbook();

  useEffect(() => {
    setLoading(true);

    getEntries()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  console.log(user);

  return (
    <section className={style.guestbookSection}>
      <div>
        <h1>Guestbook</h1>
        <form action="">
          <textarea name="" id="" cols="60" rows="3"></textarea>
          <button>Add Entry</button>
        </form>
        {loading ? (
          <p>Loading entries...</p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>{entry.content}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
