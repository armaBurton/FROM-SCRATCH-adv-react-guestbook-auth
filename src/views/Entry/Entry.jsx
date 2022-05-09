import style from './Entry.css';
import { useGuestbook } from '../../context/GuestbookProvider';

export default function Entry({ entry }) {
  const { user } = useGuestbook();

  const date = new Date(entry.created_at);

  console.log(entry);
  return (
    <div className={style.entryCard}>
      <p className={style.content}>{entry.content}</p>
      <div></div>
      <p className={style.lineItems}>
        Posted by: {user.email} on {date.toDateString()}{' '}
      </p>
    </div>
  );
}
