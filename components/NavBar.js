import Link from "next/link";
import {useUser} from "../hooks/user";
import {fetchJson} from "../lib/api";

function NavBar() {

/*    const query = useQuery('user', async () => {
        try {
            return await fetchJson('api/user')
        } catch (err) {
            return undefined;
        }
    }, {
        cacheTime: Infinity,
        staleTime: 30_000 //ms
    })*/

   // const user = query.data

/*
Without ReactQuery

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
*/


    const user = useUser();


    const handleLogout = async () => {
        await fetchJson(`api/logout`)
     //   setUser(undefined)
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