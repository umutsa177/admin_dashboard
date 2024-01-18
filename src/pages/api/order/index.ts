import nodemailer from 'nodemailer';
import db from '@/config/db';

// Sipariş verme
export default async function handler(req: any, res: any) {
    // Token kontrolü
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: 'Yetkisiz Erişim.Token Yok'});
    }

    if (req.method === 'GET') {
        if (req.query.userId) {
            db.query('SELECT `order`.*, product.name AS productName, product.price AS price FROM `order` JOIN product ON `order`.productId = product.id WHERE `order`.userId = ?', [req.query.userId], (err: any, result: any) => {
                if (err) {
                    console.error('Siparişler getirilirken bir hata oluştu:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                if (result.length === 0) {
                    return res.status(404).json({ message: 'Siparişiniz bulunamadı' });
                }

                return res.status(200).json(result);
            });
        }
        else {
            try {
                // Tüm siparişleri getir ve ilişkili kullanıcı ve ürün bilgilerini içeren sorgu
                db.query(
                    'SELECT `order`.*, user.name AS customerName,user.email AS customerEmail,product.id AS productId, product.name AS productName, product.price FROM `order` ' +
                    'JOIN user ON `order`.userId = user.id ' +
                    'JOIN product ON `order`.productId = product.id',
                    (err: any, result: any) => {
                        if (err) {
                            console.error('Siparişler getirilirken bir hata oluştu:', err);
                            return res.status(500).json({message: 'Internal Server Error'});
                        }

                        res.status(200).json(result);
                    }
                );
            } catch (error) {
                console.error('Sipariş getirme hatası:', error);
                res.status(500).json({message: 'Internal Server Error'});
            }
        }

    } else if (req.method === 'POST') {
        try {
            const { userId, productId } = req.body;

            // TODO: Veritabanına siparişi ekle (status: 1, bekleniyor)
            const no = Math.floor(1000 + Math.random() * 9000);

            const status = 1; // Bekleniyor durumu

            db.query('INSERT INTO `order` SET ?', {no, userId, productId, quantity: 1, status}, (err: any, result: any) => {
                if (err) {
                    console.error('Sipariş eklenirken bir hata oluştu:', err);
                    return res.status(500).json({message: 'Internal Server Error'});
                }

                sendEmailToCustomer(no,userId, 'Siparişiniz alındı', 'Siparişiniz alındı. Teşekkür ederiz!');

                res.status(200).json({ no, status: status, message: 'Sipariş alındı.Emailinizi kontrol ediniz' });
            });


        } catch (error) {
            console.error('Sipariş verme hatası:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

// E-posta gönderme fonksiyonu
async function sendEmailToCustomer(orderNo: any ,userId: any, subject:any, text: any) {
    try {
        const user: any = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id = ?', [userId], (err: any, result: any) => {
                if (err) {
                    console.error('Kullanıcı getirilirken bir hata oluştu:', err);
                    reject(err);
                }
                resolve(result[0]);
            });
        });
        const userEmail = user.email;

        // E-posta gönderme işlemi için nodemailer kullanımı
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ali552001a@gmail.com',
                pass: 'gdfz gpzc mgsu pell'
            }
        });

        const mailOptions = {
            from: 'ali552001a@gmail.com',
            to: userEmail,
            subject: subject,
            text: text + ' Sipariş No: ' + orderNo
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.error('Email gönderme hatası:', error);
    }
}
