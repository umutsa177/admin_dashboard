
import db from "@/config/db";
import nodemailer from "nodemailer";


export default async function handler(req: any, res: any) {
    const {method, body, query} = req;

    // Token kontrolü
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: 'Yetkisiz Erişim.Token Yok'});
    }

    try {

        switch (method) {

            case 'PUT':
                // Rol kontrolü
                if (body?.data?.role != "0") {
                    return res.status(403).json({message: 'Bu işlem için yetkiniz yok!!'});
                }

                const {status, no, customerEmail, productId} = body?.data;

                db.query('UPDATE `order` SET status = ? WHERE id = ?', [status, query.id], async (err: any, result: any) => {
                    if (err) {
                        console.error('Sipariş güncellenirken bir hata oluştu:', err);
                        return res.status(500).json({message: 'Internal Server Error'});
                    }

                    try {
                        if (status === 2) {
                            // Sipariş onaylandı, stock'ı azalt
                            await reduceProductStock(productId);
                            await sendEmailToCustomer(no, customerEmail, 'Siparişiniz Onaylandı', 'Siparişiniz Onaylandı. Yine Bekleriz!');
                        } else if (status === 0) {
                            await sendEmailToCustomer(no, customerEmail, 'Siparişiniz İptal Edildi', 'Siparişiniz İptal Edildi. Üzgünüz Siparişiniz İptal Edildi!');
                        }

                        return res.status(200).json({message: 'Sipariş başarıyla güncellendi'});
                    } catch (emailError) {
                        console.error('Email gönderme hatası:', emailError);
                        return res.status(500).json({message: 'Internal Server Error - Email gönderme hatası'});
                    }
                });

                break;

            default:
                return res.status(405).json({message: 'Method Not Allowed'});
        }
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized - Invalid token'});
    }
}

async function sendEmailToCustomer(orderNo: any, customerEmail: any, subject: any, text: any) {
    try {
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
            to: customerEmail,
            subject: subject,
            text: text + ' Sipariş No: ' + orderNo
        };

        transporter.sendMail(mailOptions, function (error, info) {
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

async function reduceProductStock(productId: any) {
    // Product tablosundaki stock'u azalt
    db.query('UPDATE product SET stock = stock - 1 WHERE id = ?', [productId], (err: any, result: any) => {
        if (err) {
            console.error('Ürün stoku azaltılırken bir hata oluştu:', err);
        }
    });
}
