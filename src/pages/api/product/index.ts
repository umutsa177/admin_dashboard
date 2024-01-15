import jwt from 'jsonwebtoken';
import db from "@/config/db";

const secretKey: any = process.env.JWT_SECRET_KEY;

export default async function handler(req: any, res: any) {
    const { method, body, query } = req;

    // Token kontrolü
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    try {
        // Token doğrulama
        const decodedToken: any = jwt.verify(token, secretKey);

        // Rol kontrolü
        if (decodedToken.role !== 0) {
            return res.status(403).json({ message: 'Forbidden - Unauthorized access' });
        }

        switch (method) {
            case 'GET':
                if (query && query.id) {
                    // Tek bir ürünü getir
                    db.query('SELECT * FROM product WHERE id = ?', [query.id], (err: any, result: any) => {
                        if (err) {
                            console.error('Ürün getirilirken bir hata oluştu:', err);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        if (result.length === 0) {
                            return res.status(404).json({ message: 'Ürün bulunamadı' });
                        }

                        return res.status(200).json(result[0]);
                    });
                } else {
                    // Tüm ürünleri getir
                    db.query('SELECT * FROM product', (err: any, result: any) => {
                        if (err) {
                            console.error('Ürünler getirilirken bir hata oluştu:', err);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        return res.status(200).json(result);
                    });
                }
                break;
            case 'POST':
                // Yeni ürün ekle
                const { productName, price } = body;

                if (!productName || !price) {
                    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
                }

                // Veritabanına ürün ekleme işlemi
                db.query('INSERT INTO product SET ?', { productName, price }, (err: any, result: any) => {
                    if (err) {
                        console.error('Ürün eklenirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(201).json({ message: 'Ürün başarıyla eklendi' });
                });
                break;
            case 'PUT':
                // Ürün güncelle
                const { updatedProductName, updatedPrice } = body;

                if (!updatedProductName || !updatedPrice) {
                    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
                }

                // Veritabanında ilgili ürünü güncelleme işlemi
                db.query('UPDATE products SET productName = ?, price = ? WHERE id = ?', [updatedProductName, updatedPrice, query.id], (err: any, result: any) => {
                    if (err) {
                        console.error('Ürün güncellenirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Ürün başarıyla güncellendi' });
                });
                break;
            case 'DELETE':
                // Ürün sil
                const productId = query.id;

                if (!productId) {
                    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
                }

                // Veritabanında ilgili ürünü silme işlemi
                db.query('DELETE FROM products WHERE id = ?', [productId], (err: any, result: any) => {
                    if (err) {
                        console.error('Ürün silinirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Ürün başarıyla silindi' });
                });
                break;
            default:
                return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}
