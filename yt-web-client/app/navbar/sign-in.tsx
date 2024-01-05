"use client";
import { Fragment } from "react";

import { signInWithGoogle, signOut} from "../utilities/firebase/firebase";
import styles from './sign-in.module.css'
import { User } from "firebase/auth";

interface SignInProps {
    user: User | null;
}

// SignIn allows either null or User as param.
export default function SignIn({ user }: SignInProps) {
    return (
        <Fragment>
            { user ?
                (
                    <button className={styles.signin} onClick={signOut}>
                        Sign Out     
                    </button>  

                ) : (
                    <button className={styles.signin} onClick={signInWithGoogle}>
                        Sign In
                    </button>
                )
            }
        </Fragment>
    )
}