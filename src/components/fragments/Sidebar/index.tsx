import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type PropsType = {
  lists: Array<{
    title: string;
    url: string;
    icon: React.ReactNode;
  }>;
};

const Sidebar = (props: PropsType) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}>Admin Panel</h1>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={index}
              className={`
            ${styles.sidebar__top__lists__item}
            ${pathname === list.url && styles.sidebar__top__lists__item__active}
            `}
            >
              {list.icon}
              <h4 className={styles.sidebar__top__lists__item__title}>
                {list.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <Button
          className={styles.sidebar__bottom__button}
          type="button"
          onClick={() => signOut()}
          variant="secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
