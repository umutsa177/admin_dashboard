import type {AppProps} from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import Layout from "@/Layout";
import {AuthProvider} from "@/provider/authProvider";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>

    );
}


