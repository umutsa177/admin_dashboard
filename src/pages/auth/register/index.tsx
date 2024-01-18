import {NextPage} from 'next';
import {Button, Container, CssBaseline, FormControl, Input, InputLabel, Link, Paper, Typography} from '@mui/material';
import {SyntheticEvent, useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {CiUser} from 'react-icons/ci';
import {toast} from "react-toastify";
import { useRouter } from 'next/router';
import baseApi from "@/axios/baseApi";
import {useAuth} from "@/provider/authProvider";

const Register: NextPage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {signIn} = useAuth();
    const {push} = useRouter();

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            let body = {
                name,
                email,
                password
            }

            const response = await baseApi.post('/auth/register', body);
            if(response.status === 201){
                toast.success('Kayıt Başarılı')
                push('/auth/signIn')
            }
        } catch (e: any) {
            console.log(e);
            toast.error(e.response.data.message);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', height: '100vh'}}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Paper elevation={3} sx={{padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {loading ? (
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div>
                                <ClipLoader color="#ffffff" loading={loading} size={75}/>
                            </div>
                            <div style={{marginTop: '1rem'}}>Giriş Yapılıyor...</div>
                        </div>
                    ) : (
                        <>
                            <CiUser style={{fontSize: '3rem', marginBottom: '1rem'}}/>
                            <Typography component="h1" variant="h5">
                                REGISTER
                            </Typography>
                            <Typography variant="body2" color="textSecondary"
                                        style={{marginTop: '1rem', marginBottom: '2rem'}}>
                                Giriş Yapın
                            </Typography>
                            <form onSubmit={handleLogin} style={{width: '100%'}}>
                                <FormControl fullWidth sx={{marginBottom: '1rem'}}>
                                    <InputLabel htmlFor="email">Name</InputLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        disabled={submitting}
                                        placeholder="name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{marginBottom: '1rem'}}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        disabled={submitting}
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{marginBottom: '1rem'}}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        disabled={submitting}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Link href="/auth/signIn" variant="body2" sx={{marginBottom: '1rem'}}>
                                    {"Sign In"}
                                </Link>
                                <Button type="submit" fullWidth variant="outlined" sx={{marginTop: '1rem'}}>
                                    Sign Up
                                </Button>
                            </form>
                        </>
                    )}
                </Paper>

            </Container>
        </div>
    );
};

export const getServerSideProps = async (ctx: any) => {
    const {req, res} = ctx;
    const {token} = req?.cookies;

    if(token){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
}
export default Register;
