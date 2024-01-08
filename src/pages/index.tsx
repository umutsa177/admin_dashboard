import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from "@/Layout";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl">Dashboard</h1>
      <p className="text-lg">Welcome to the Admin Dashboard</p>
    </Layout>
  )
}
