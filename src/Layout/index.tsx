// components/Layout.js
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';


// @ts-ignore
const Layout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Head>
                <title>Admin Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-4 overflow-y-auto bg-gray-200">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
