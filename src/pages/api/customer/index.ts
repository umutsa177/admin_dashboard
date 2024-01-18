import {sql} from "@vercel/postgres";
import bcrypt from "bcrypt";
import db from "@/config/db";

const handler = async (req: any, res: any) => {
    const {method} = req;
    if (method === "GET") {
        try {
            db.query(
                'SELECT user.name AS customerName,user.email AS customerEmail FROM `user` where user.role = 1',
                (err: any, result: any) => {
                    if (err) {
                        console.error('Müşteriler getirilirken bir hata oluştu:', err);
                        return res.status(500).json({message: 'Internal Server Error'});
                    }

                    res.status(200).json(result);
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Bir hata oluştu", errorMessage: err});
        }
    }


};

export default handler;
