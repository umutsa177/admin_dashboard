import db from "@/config/db";


export default function handler(req: any, res: any) {
    const { id } = req.query;

    if (req.method === 'GET') {
        db.query('SELECT * FROM categories', (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Kategoriler getirilemedi.' });
                throw error;
            }
            res.status(200).json(results);
        });
    }
    else if (req.method === 'POST') {
        const { name } = req.body;
        db.query('INSERT INTO categories (name) VALUES (?)', [name], (error, result) => {
            if (error) {
                res.status(500).json({ message: 'Kategori oluşturulamadı.' });
                throw error;
            }
            res.status(201).json({ message: 'Kategori oluşturuldu.', id: result.insertId });
        });
    }
    else if (req.method === 'PATCH') {
        const { name } = req.body;
        db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, result) => {
            if (error) {
                res.status(500).json({ message: 'Kategori güncellenemedi.' });
                throw error;
            }
            res.status(200).json({ message: 'Kategori güncellendi.', id });
        });
    } else if (req.method === 'DELETE') {
        db.query('DELETE FROM categories WHERE id = ?', [id], (error, result) => {
            if (error) {
                res.status(500).json({ message: 'Kategori silinemedi.' });
                throw error;
            }
            res.status(200).json({ message: 'Kategori silindi.', id });
        });
    } else {
        res.status(405).end(); // Diğer isteklere izin verme (Method Not Allowed)
    }
}
