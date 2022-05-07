import { useEffect, useState } from 'react';
import { useGuestbook } from '../../context/GuestbookProvider';
import { getEntries, createEntry } from '../../services/entries';
import Entry from '../Entry/Entry';
import style from './Guestbook.css';

export default function Guestbook({ children, ...rest }) {
  const { user, entries, setEntries, loading, setLoading } = useGuestbook();
  const [textState, useTextState] = useState('');
  const [guestObj, setGuestObj] = useState({});

  useEffect(() => {
    setLoading(true);

    getEntries()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(user.id, textState);

    const guestbookObj = {
      userId: user.id,
      content: textState,
    };

    await createEntry(guestbookObj);
    await getEntries()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleGuesbookChange(e) {
    e.preventDefault();
    useTextState(e.target.value);
  }
  console.log(user);

  return (
    <section className={style.guestbookSection}>
      <div>
        <h1>Guestbook</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            id="content"
            placeholder="Please leave a message"
            cols="60"
            rows="3"
            onChange={handleGuesbookChange}
          ></textarea>
          <button type="submit">Add Entry</button>
        </form>
        {loading ? (
          <p>Loading entries...</p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <Entry key={entry.id} entry={entry} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
