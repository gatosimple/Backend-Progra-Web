import express, { Request, Response } from "express";
import { Op } from "sequelize";
const db = require("../DAO/models");

const AccessLogsController = () => {
    const path: string = "/accesslogs";
    const router = express.Router();

    router.post("/", async (req: Request, res: Response) => {
        try {
            const { user_id, action, firstaccess } = req.body;

            const accessLogCreado = await db.Access_logs.create({
                user_id,
                access_time: new Date(),
                action,
                firstaccess,
            });

            res.json({ msg: "Access log created", log: accessLogCreado });
        } catch (error) {
            console.error("Error creating access log:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    router.get("/", async (req: Request, res: Response) => {
        try {
            console.log("Fetching access logs...");
            const accessLogs = await db.Access_logs.findAll({
                attributes: ["id", "access_time", "action"],
                include: [{
                    model: db.Usuario,  
                    as: "Usuario", 
                    attributes: ["name", "email"]
                }],
                order: [["access_time", "DESC"]],
            });

            console.log("Fetched logs:", accessLogs);
            res.status(200).json(accessLogs);
        } catch (error) {
            console.error("Error fetching access logs:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return [path, router];
};

export default AccessLogsController;
