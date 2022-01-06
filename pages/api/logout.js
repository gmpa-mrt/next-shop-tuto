import cookie from "cookie";

function logout(req, res) {
    res.status(200)
        .setHeader('Set-Cookie', cookie.serialize('jwt', '', {
            path: '/api',
            expire: new Date(0)
        })).json({})
}

export default logout