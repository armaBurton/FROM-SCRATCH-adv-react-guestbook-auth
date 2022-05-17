import { useEffect, useState } from 'react';
import { useGuestbook } from '../../context/GuestbookProvider';
import { getEntries, createEntry } from '../../services/entries';
import Entry from '../Entry/Entry';
import style from './Guestbook.css';

export default function Guestbook({ children, ...rest }) {
  const { user, entries, setEntries, loading, setLoading } = useGuestbook();
  const [textState, setTextState] = useState('');
  const [guestObj, setGuestObj] = useState({});

  useEffect(() => {
    // setLoading(true);

    // getEntries()
    //   .then(setEntries)
    //   .catch(console.error)
    //   .finally(() => setLoading(false));
    async function getList() {
      setLoading(true);
      const list = await getEntries();
      setEntries(list);
      setLoading(false);
    }

    getList();
  }, []);

  console.log(entries);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (textState === '') {
        return;
      } else {
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
        setTextState('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleGuesbookChange(e) {
    e.preventDefault();
    setTextState(e.target.value);
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
            data-testid="content"
            placeholder="Please leave a message"
            cols="60"
            rows="3"
            value={textState}
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
