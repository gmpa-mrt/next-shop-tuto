import Link from "next/link";
import {useEffect, useState} from "react";
import {fetchJson} from "../lib/api";

function NavBar() {
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
            try {
                const user = await fetchJson(`api/user`)
                setUser(user)
            } catch (e) {
                // not signed
            }
        })()
    }, []);

    const handleLogout = async () => {
        await fetchJson(`api/logout`)
        setUser(undefined)
    }

    return (
        <nav className="px-2 py-1">
            <ul className="flex gap-2">
                <li>
                    <Link href={'/'}>
                        <a>
                            Next Shop
                        </a>
                    </Link>
                </li>
                {user ? (
                    <>
                        <li>
                            {user.name}
                        </li>
                        <li>
                            <button onClick={handleLogout}>Sign Out</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href={'/sign-in'}>
                            <a>
                                Sign In
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;