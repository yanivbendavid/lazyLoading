import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

export default function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
    </>
  );
}
