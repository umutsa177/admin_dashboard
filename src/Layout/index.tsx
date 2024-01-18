// Layout.tsx
import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import CustomSidebar from '@/components/Sidebar';
import CustomAppBar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children = null }) => {
    const router = useRouter();
    const isLoginPage = router.pathname === '/auth/signIn' || router.pathname === '/auth/register';


    return (
        <>
            <CssBaseline />
            {!isLoginPage  && <CustomAppBar />}
            <div style={{ display: 'flex', textAlign: 'center' }}>
                {!isLoginPage && <CustomSidebar />}
                <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                </Container>
            </div>
            <ToastContainer />
        </>
    );
};

export default Layout;
