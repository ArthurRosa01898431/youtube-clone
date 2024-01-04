import Image from "next/image"
import Link from "next/link";

import styles from "./navbar.module.css";

{/* 
    Sets up the Navbar to have css from styles.nav that has a
    Link object with an image inside that leads to root page.
*/}
export default function Navbar() {
    return (
      <nav className={styles.nav}>
        <Link href="/">
          <Image width={90} height={20}
            src="/youtube-logo.svg" alt="YouTube Logo"/>
        </Link>
      </nav>
    );
  }