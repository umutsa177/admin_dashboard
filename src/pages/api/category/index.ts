import jwt from 'jsonwebtoken';
import db from "@/config/db";


export default async function handler(req: any, res: any) {
    const {method, body, query} = req;

    // Token kontrolü
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: 'Yetkisiz Erişim.Token Yok'});
    }


    try {

        switch (method) {
            case 'GET':
                // Tüm kategorileri getir
                db.query('SELECT * FROM category', (err: any, result: any) => {
                    if (err) {
                        console.error('Kategoriler getirilirken bir hata oluştu:', err);
                        return res.status(500).json({message: 'Internal Server Error'});
                    }

                    return res.status(200).json(result);
                });

                break;
            case 'POST':
                // Rol kontrolü
                if (body.role != 0) {
                    return res.status(403).json({message: 'Rolünüz Bu İşlemi Yapmaya Uygun Değil'});
                }
                // Yeni kategori ekle
                const {name} = body;

                if (!name) {
                    return res.status(400).json({message: 'Lütfen tüm alanları doldurun!'});
                }

                // Veritabanına kategori ekleme işlemi
                db.query('INSERT INTO category SET ?', {name}, (err: any, result: any) => {
                    if (err) {
                        console.error('Kategori eklenirken bir hata oluştu:', err);
                        return res.status(500).json({message: 'Internal Server Error'});
                    }

                    return res.status(201).json({message: 'Kategori başarıyla eklendi'});
                });
                break;


            default:
                return res.status(405).json({message: 'Method Not Allowed'});
        }
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized - Invalid token'});
    }
}
