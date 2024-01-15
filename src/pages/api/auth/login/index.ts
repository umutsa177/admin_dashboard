import db from '../../../../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey: any = process.env.JWT_SECRET_KEY; // JSON Web Token (JWT) için gizli anahtar

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
        }

        // E-posta kontrolü
        db.query('SELECT * FROM user WHERE email = ?', [email], async (err: any, result: any) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                return res.status(401).json({ message: 'Kullanıcı bulunamadı!' });
            }

            const user = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                role: result[0].role,
            };

            try {
                // Parola kontrolü
                const match = await bcrypt.compare(password, result[0].password);

                if (match) {
                    // Parola doğru, JWT oluştur
                    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

                    // Kullanıcı bilgileri ve token ile birlikte dön
                    return res.status(200).json({ message: 'Giriş başarılı', user, token });
                } else {
                    // Parola yanlış
                    return res.status(401).json({ message: 'Hatalı parola!' });
                }
            } catch (error) {
                console.error('Parola karşılaştırma hatası:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
