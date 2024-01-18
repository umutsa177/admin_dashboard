import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',      // MySQL sunucu adresi
    user: 'admin_dash',     // Veritabanı kullanıcı adı
    password: 'root',       // Veritabanı şifresi
    database: 'admin_dashboard_db' // Kullanılacak veritabanı adı
});

/*const db = mysql.createConnection({
    host: 'admindashboard.cluster-cru860oucxic.eu-north-1.rds.amazonaws.com',      // MySQL sunucu adresi
    user: 'admin_dash',     // Veritabanı kullanıcı adı
    password: 'O6sPKmWFvCcKcjf6xdd3',       // Veritabanı şifresi
    database: 'admindashboard' // Kullanılacak veritabanı adı
});*/

// Bağlantıyı başlat
db.connect((err: any) => {
    if (err) {
        throw err;
    }
    console.log('MySQL veritabanına bağlandı!');
});

export default db;
