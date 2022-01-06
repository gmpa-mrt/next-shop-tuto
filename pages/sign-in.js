import {useState} from 'react';
import {useRouter} from "next/router";
import Button from "../components/Button";
import Field from "../components/Field";
import Page from "../components/Page";
import Input from "../components/Input";
import {fetchJson} from "../lib/api";

function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ loading: false, err: false });

    const handleSubmit = async e => {
        e.preventDefault()
        setStatus({ loading: true, err: false })
        try {
            const response = await fetchJson(`api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            setStatus({ loading: false, err: false })
            await router.push('/')
        } catch (e) {
            setStatus({ loading:  false, err: true })
        }
    }

    return (
        <Page title="Sign in">
            <form onSubmit={handleSubmit}>
                <Field label="Email">
                    <Input type="email" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </Field>
                <Field label="Password">
                    <Input type="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </Field>
                {status.err && (
                    <p className="text-red-700">
                        Invalid credentials
                    </p>
                )}
                {status.loading ? (
                    <p>Loading...</p>
                ) : (
                    <Button type="submit">
                        Sign In
                    </Button>
                )}
            </form>
        </Page>
    );
}

export default SignIn;