import cookie from 'cookie';

export default async function handler(req: any, res: any) {

    if(req.method === 'PUT'){
        res.setHeader(
            'Set-Cookie', cookie.serialize('token', '', {
                expires: new Date(0),
                path: '/'
            })
        )

        res.status(200).json({ message: 'Çıkış başarılı' });
    }


}
