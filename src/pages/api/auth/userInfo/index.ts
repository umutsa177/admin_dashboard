// pages/api/auth/userinfo.js
import { getSession } from 'next-auth/react';

export default async function handler(req: any, res: any) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Oturum varsa, kullanıcı bilgilerini döndür
    return res.status(200).json({ user: session.user });
}
