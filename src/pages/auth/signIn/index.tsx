import { NextPage } from 'next';
import { Button, Container, CssBaseline, FormControl, Input, InputLabel, Paper, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { CiUser } from 'react-icons/ci';

const Login: NextPage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = {
                email: email,
                password: password
            };
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div>
                                <ClipLoader color="#ffffff" loading={loading} size={75} />
                            </div>
                            <div style={{ marginTop: '1rem' }}>Giriş Yapılıyor...</div>
                        </div>
                    ) : (
                        <>
                            <CiUser style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                            <Typography component="h1" variant="h5">
                                ADMIN
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                                Giriş Yapın
                            </Typography>
                            <form onSubmit={handleLogin} style={{ width: '100%' }}>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        disabled={submitting}
                                        placeholder="email"
                                        defaultValue="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        disabled={submitting}
                                        placeholder="Password"
                                        defaultValue="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Button type="submit" fullWidth variant="outlined" sx={{ marginTop: '1rem' }}>
                                    Giriş Yap
                                </Button>
                            </form>
                        </>
                    )}
                </Paper>
            </Container>
        </div>
    );
};

export default Login;
