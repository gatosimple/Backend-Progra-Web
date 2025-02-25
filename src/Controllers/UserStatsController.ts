import express, { Request, Response } from "express";
const db = require("../DAO/models"); // Asegurarse de que la importación es correcta
import { Op, Sequelize } from "sequelize";

const router = express.Router();

// ✅ Obtener estadísticas de usuarios
const getUserStatistics = async (req: Request, res: Response) => {
    try {
        const Usuario = db.usuario; // Asegurar que el modelo se está obteniendo correctamente

        const totalUsers = await Usuario.count();

        const newUsersByMonth = await Usuario.findAll({
            attributes: [
                [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"), "month"],
                [Sequelize.fn("COUNT", "*"), "newUsers"],
            ],
            group: ["month"],
            order: [["month", "ASC"]],
        });

        res.status(200).json({ totalUsers, newUsersByMonth });
    } catch (error) {
        console.error("Error getting user statistics:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🚀 Registrar ruta en el router
router.get("/", getUserStatistics);

// ✅ Exportar correctamente como función
export default function UserStatsController() {
    return ["/user-statistics", router];
}
