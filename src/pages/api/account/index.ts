import {sql} from "@vercel/postgres";
import bcrypt from "bcrypt";

const handler = async (req: any, res: any) => {
    const {method} = req;
    if (method === "PUT") {
        try {
            const {id, email, password, updateType} = req.body;

            if(updateType === "emailAndPasswordUpdate"){
                const existingUser = await sql`SELECT * from Users WHERE email = ${email}`;
                if (existingUser.rows.length > 0) {
                    return res.status(400).json({ message: "Bu email adresi zaten kullanılıyor" });
                }

                const existingRecord = await sql`SELECT * FROM users WHERE id = ${id}`;

                const hashedPassword = await bcrypt.hash(password, 10);

                if (existingRecord.rows.length > 0) {
                    const result = await sql`
                UPDATE users 
                SET 
                    email = ${email}, 
                    password = ${hashedPassword}
                WHERE id = ${id};
            `;
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "Kullanıcı bulunamadı"});
                }
            }else if(updateType === "passwordUpdate"){
                const existingRecord = await sql`SELECT * FROM users WHERE id = ${id}`;

                const hashedPassword = await bcrypt.hash(password, 10);

                if (existingRecord.rows.length > 0) {
                    const result = await sql`
                UPDATE users 
                SET 
                    password = ${hashedPassword}
                WHERE id = ${id};
            `;
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "Kullanıcı bulunamadı"});
                }
            }




        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Bir hata oluştu", errorMessage: err});
        }
    }


};

export default handler;
