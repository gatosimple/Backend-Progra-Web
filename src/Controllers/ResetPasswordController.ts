import express, {Request, Response} from "express"
const db = require("../DAO/models")
const jwt = require("jsonwebtoken")

const ResetPasswordController = () => {
    const path: string = "/reset-password";
    
    const router = express.Router();

    return [path, router]

}

export default ResetPasswordController