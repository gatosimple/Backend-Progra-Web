import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
const db = require("../DAO/models");

