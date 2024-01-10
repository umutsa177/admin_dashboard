import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from "@/Layout";

 const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <Layout>
//       <p className="text-lg">Welcome to the Admin Dashboard</p>
//     </Layout>
//   )
import ConfigurationForm from '../components/config_form';
import { Container } from 'postcss';
export default function Home() {
  return (
    <Layout>
      <ConfigurationForm />
    </Layout>
    );
  }
