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

        // Rol kontrolü
        if (body.role != 0) {
            return res.status(403).json({ message: 'Forbidden - Unauthorized access' });
        }

        switch (method) {
            case 'GET':
                if (query && query.id) {
                    // Tek bir kategoriyi getir
                    db.query('SELECT * FROM category WHERE id = ?', [query.id], (err: any, result: any) => {
                        if (err) {
                            console.error('Kategori getirilirken bir hata oluştu:', err);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        if (result.length === 0) {
                            return res.status(404).json({ message: 'Kategori bulunamadı' });
                        }

                        return res.status(200).json(result[0]);
                    });
                } else {
                    // Tüm kategorileri getir
                    db.query('SELECT * FROM category', (err: any, result: any) => {
                        if (err) {
                            console.error('Kategoriler getirilirken bir hata oluştu:', err);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        return res.status(200).json(result);
                    });
                }
                break;
            case 'POST':
                // Yeni kategori ekle
                const { name } = body;

                if (!name) {
                    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
                }

                // Veritabanına kategori ekleme işlemi
                db.query('INSERT INTO category SET ?', { name }, (err: any, result: any) => {
                    if (err) {
                        console.error('Kategori eklenirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(201).json({ message: 'Kategori başarıyla eklendi' });
                });
                break;
            case 'PUT':
                // Kategori güncelle
                const { categoryName } = body;

                if (!query.id || !categoryName) {
                    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
                }

                // Veritabanında ilgili kategoriyi güncelleme işlemi
                db.query('UPDATE category SET name = ? WHERE id = ?', [categoryName, query.id], (err: any, result: any) => {
                    if (err) {
                        console.error('Kategori güncellenirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Kategori başarıyla güncellendi' });
                });
                break;
            case 'DELETE':
                // Kategori sil
                const categoryId = query.id;

                if (!categoryId) {
                    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
                }

                // Veritabanında ilgili kategoriyi silme işlemi
                db.query('DELETE FROM category WHERE id = ?', [categoryId], (err: any, result: any) => {
                    if (err) {
                        console.error('Kategori silinirken bir hata oluştu:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Kategori başarıyla silindi' });
                });
                break;
            default:
                return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}
