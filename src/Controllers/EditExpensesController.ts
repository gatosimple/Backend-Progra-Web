import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
const db = require("../DAO/models");

const EditExpensesController = () => {
    const path: string = "/edit-expenses"
    const router = express.Router()


    //Endpoint para editar los gastos
    router.post("/", async (req: Request, re: Response) => {
        const gasto = req.body
        
        

    })
}

export default EditExpensesController