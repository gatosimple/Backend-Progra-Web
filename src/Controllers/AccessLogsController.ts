import express, { Request, Response } from "express";
const db = require("../DAO/models");
const jwt = require("jsonwebtoken");
import { Op } from "sequelize";

const AccessLogsController = () => {
    const path: string = "/accesslogs";
    const router = express.Router();

    // 🚀 Ruta existente: Registrar un nuevo acceso
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
            res.status(401).json({ error: "token missing or invalid" });
            return;
        }

        const existingLog = await db.Access_logs.findOne({
            where: { user_id: decodedToken.id }
        });

        const nuevoAccessLog= req.body;

        const accessLogCreado = await db.access_logs.create({
            id: null,
            user_id: decodedToken.id,
            // access_time: new Date(),
            action: nuevoAccessLog.action,
            firstaccess: existingLog ? false : true
        });

        res.json({
            msg: "",
            al: accessLogCreado
        });
    });

    // ✅ NUEVA RUTA: Consultar historial de acceso
    router.get("/", async (req: Request, res: Response) => {
        try {
            const { userId, fechaInicio, fechaFin } = req.query;

            let whereCondition: any = {};

            if (userId) {
                whereCondition.user_id = userId;
            }

            if (fechaInicio && fechaFin) {
                whereCondition.access_time = {
                    [Op.between]: [new Date(fechaInicio as string), new Date(fechaFin as string)]
                };
            }

            const accessLogs = await db.access_logs.findAll({
                where: whereCondition,
                order: [["access_time", "DESC"]],
            });

            res.status(200).json(accessLogs);
        } catch (error) {
            console.error("Error fetching access logs:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return [path, router];
};

export default AccessLogsController;
