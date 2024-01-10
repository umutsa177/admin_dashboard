import Head from 'next/head';
import { Container, CssBaseline } from '@mui/material';
import CustomSidebar from '@/components/Sidebar';
import CustomAppBar from '@/components/Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <CustomAppBar />
      <div style={{ display: 'flex', textAlign: 'center' }}>
        <CustomSidebar />
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Container>
      </div>
    </>
  );
};

export default Layout;
