import express, {Request, Response} from "express"
const db = require("../DAO/models")
const jwt = require("jsonwebtoken")

const AccessLogsController = () => {
    const path: string = "/accesslogs";
    
    const router = express.Router();

    router.post('/', async (req: Request, res: Response) => {
        const authorization = req.get("authorization");

        let token = '';

        if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
            token = authorization.substring(7);
        }

        let decodedToken = {} as any;

        try {
            decodedToken = jwt.verify(token, process.env.SECRET as string);
        } catch (e) {
            console.log(e);
        }

        if (!token || !decodedToken.id) {
            res.status(401).json({error: 'token missing or invalid'});
            return;
        }

        const nuevoAccessLog= req.body;

        const accessLogCreado = await db.Access_logs.create({
            id: null,
            user_id: decodedToken.id,
            access_time: new Date().toISOString(),
            action: nuevoAccessLog.action,
            firstaccess: nuevoAccessLog.firstaccess
        });

        res.json({
            msg: "",
            al: accessLogCreado
        })
    });

    return [ path, router ];
}

export default AccessLogsController;