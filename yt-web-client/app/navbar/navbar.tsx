"use client";

import Image from "next/image"
import Link from "next/link";

import Upload from "./upload";
import SignIn from "./sign-in";

import styles from "./navbar.module.css";

import { onAuthStateChangedHelper } from "../firebase/firebase";

import { useEffect, useState } from "react";

import { User } from "firebase/auth";

{/* 
    Sets up the Navbar to have css from styles.nav that has a
    Link object with an image inside that leads to root page.
*/}
export default function Navbar() {
  // Init user state.
  // User var maintains the state while setUser var updates the state.  
  const [user, setUser] = useState<User | null>(null);

  // useEffect allows javascript to run a single time when NavBar loads.
  // Therefore it finds out the state of the user which is either null or not.
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount.
    return () => unsubscribe();
  }, [] /* No dependencies, never rerun */)

    return (
      <nav className={styles.nav}>
        <Link href="/">
          <Image width={90} height={20}
            src="/youtube-logo.svg" alt="YouTube Logo"/>
        </Link>
        {
          user && <Upload/> // If user is signed in, show upload button.
        }
        <SignIn user={user}/>
      </nav>
    );
  }