import jwt from 'jsonwebtoken';
import db from "@/config/db";


export default async function handler(req: any, res: any) {
    const { method, body, query } = req;

    // Token kontrolü
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Yetkisiz Erişim.Token Yok' });
    }


    try {

        switch (method) {
            case 'GET':
                if (query && query.id) {
                    const categoryId = query.id;


                    // Tek bir kategoriyi getir
                    db.query('SELECT * FROM category WHERE id = ?', [categoryId], (err: any, result: any) => {
                        if (err) {
                            console.error('Kategori getirilirken bir hata oluştu:', err);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        if (result.length === 0) {
                            return res.status(404).json({ message: 'Kategori bulunamadı' });
                        }

                        return res.status(200).json(result[0]);
                    });
                }
                break;
            case 'PUT':
                // Rol kontrolü
                if (body.role != 0) {
                    return res.status(403).json({message: 'Rolünüz Bu İşlemi Yapmaya Uygun Değil'});
                }
                // Kategori güncelle
                const {name} = body;

                if (!query.id || !name) {
                    return res.status(400).json({message: 'Lütfen tüm alanları doldurun!'});
                }

                // Veritabanında ilgili kategoriyi güncelleme işlemi
                db.query('UPDATE category SET name = ? WHERE id = ?', [name, query.id], (err: any, result: any) => {
                    if (err) {
                        console.error('Kategori güncellenirken bir hata oluştu:', err);
                        return res.status(500).json({message: 'Internal Server Error'});
                    }

                    return res.status(200).json({message: 'Kategori başarıyla güncellendi'});
                });
                break;
            case 'DELETE':
                // Rol kontrolü
                if (body.role != 0) {
                    return res.status(403).json({message: 'Rolünüz Bu İşlemi Yapmaya Uygun Değil'});
                }
                // Kategori sil
                const categoryId = query.id;

                if (!categoryId) {
                    return res.status(400).json({message: 'Lütfen tüm alanları doldurun!'});
                }

                // Veritabanında ilgili kategoriyi silme işlemi
                db.query('DELETE FROM category WHERE id = ?', [categoryId], (err: any, result: any) => {
                    if (err) {
                        console.error('Kategori silinirken bir hata oluştu:', err);
                        return res.status(500).json({message: 'Internal Server Error'});
                    }

                    return res.status(200).json({message: 'Kategori başarıyla silindi'});
                });
                break;
            default:
                return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}
