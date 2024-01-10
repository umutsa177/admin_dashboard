import {sql} from "@vercel/postgres";

import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const generateToken = (userId: any) => {
  return jwt.sign({userId}, 'secret_key', {expiresIn: '1h'});
};
const handler = async (req: any, res: any) => {
  const { method } = req;
  if (method === "POST") {
    try {
      const { email, password } = req.body;

      // Kullanıcıyı veritabanından al
      const user = await sql`SELECT * from Users WHERE email = ${email}`;

      if (user.rows.length > 0) {
        const hashedPassword = user.rows[0].password;

        // Şifreyi karşılaştır
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
          // Şifre doğru, token oluştur ve gönder
          const token = generateToken(user.rows[0].id);
          const userInfo = {
            id: user.rows[0].id,
            email: user.rows[0].email,
          }
          res.status(200).json({token: token , user: userInfo });
        } else {
          // Şifre yanlış
          res.status(401).json({ message: "Email adresi veya şifre hatalı" });
        }
      } else {
        // Kullanıcı bulunamadı
        res.status(401).json({ message: "Kullanıcı Bulunamadı" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Bir hata oluştu", errorMessage: err });
    }
  }
};


export default handler;
