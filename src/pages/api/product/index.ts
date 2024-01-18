import jwt from 'jsonwebtoken';
import db from "@/config/db";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'products');

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

                // Tüm ürünleri getir
                db.query('SELECT product.*, category.name AS category_name FROM product JOIN category ON product.categoryId = category.id', (err: any, result: any) => {
                    if (err) {
                        console.error('Ürünler getirilirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(200).json(result);
                });

                break;
            case 'POST':
                // Rol kontrolü
                if (body.role != 0) {
                    return res.status(403).json({message: 'Forbidden - Unauthorized access'});
                }
                // Yeni ürün ekle
                const {name, price, categoryId, description, stock, image} = body;

                if (!name || !price || !categoryId || !description || !stock) {
                    return res.status(400).json({message: 'Lütfen tüm alanları doldurun!'});
                }

                if (image) {
                    const matches = image.split('.').pop()

                    if (!matches) {
                        console.error('Geçersiz veya tanımsız bir image formatı.');
                        return res.status(400).json({ message: 'Geçersiz veya tanımsız bir image formatı.' });
                    }

                    const fileName = `${uuidv4()}.${matches}`;
                    const filePath = path.join(UPLOADS_DIR, fileName);

                    // base64 formatındaki resmi dosyaya kaydet
                    if (image && typeof image === 'string') {
                        const base64Data = image.replace(/^data:image\/([a-zA-Z0-9]+);base64,/, '');

                        try {
                            await fs.writeFile(filePath, base64Data, 'base64');
                        } catch (error) {
                            console.error('Dosyaya yazma hatası:', error);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        // Veritabanına ürün ekleme işlemi
                        db.query('INSERT INTO product SET ?', { name, price, categoryId, description, stock, filePath: fileName }, (err: any, result: any) => {
                            if (err) {
                                console.error('Ürün eklenirken bir hata oluştu:', err);
                                return res.status(500).json({ message: 'Internal Server Error' });
                            }

                            return res.status(201).json({ message: 'Ürün başarıyla eklendi' });
                        });
                    } else {
                        // Hata durumunu işle
                        console.error('Geçersiz veya tanımsız bir image değeri.');
                        return res.status(400).json({ message: 'Geçersiz veya tanımsız bir image değeri.' });
                    }
                }
                else{
                    db.query('INSERT INTO product SET ?', {name, price, categoryId, description, stock}, (err: any, result: any) => {
                        if (err) {
                            console.error('Ürün eklenirken bir hata oluştu:', err);
                            return res.status(500).json({message: 'Internal Server Error'});
                        }

                        return res.status(201).json({message: 'Ürün başarıyla eklendi'});
                    });
                }

                break;

            default:
                return res.status(405).json({message: 'Method Not Allowed'});
        }
    } catch (error) {
        return res.status(500).json({message: error});
    }
}
