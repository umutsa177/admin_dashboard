import db from '../../../../config/db';
import bcrypt from 'bcrypt';

const saltRounds = 10; // Hashleme sırasında kullanılacak tuz sayısı

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        //0 admin, 1 user
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
        }


        // E-posta kontrolü
        db.query('SELECT * FROM user WHERE email = ?', [email], async (err: any, result: any) => {
            if (err) {
                throw err;
            }

            if (result.length > 0) {
                return res.status(400).json({ message: 'Bu e-posta adresi kullanımda!' });
            }

            try {
                // Şifreyi hash'le
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // Kullanıcıyı veritabanına ekle
                db.query('INSERT INTO user SET ?', { name, email, password: hashedPassword, role }, (err: any, result: any) => {
                    if (err) {
                        throw err;
                    }
                    return res.status(201).json({ message: 'Kayıt başarılı!' });
                });
            } catch (error) {
                console.error('Hashleme hatası:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
