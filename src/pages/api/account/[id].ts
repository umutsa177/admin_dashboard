import {sql} from "@vercel/postgres";


const handler = async (req: any, res: any) => {
    const {method, query} = req;

    if (method === "GET") {
        try {
            const { id } = query;
            const result = await sql`
                SELECT * FROM users where id = ${id};
            `;

            res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Bir hata oluştu", errorMessage: err});
        }
    }


};

export default handler;
