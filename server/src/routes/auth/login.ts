import * as express from "express";
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { Business } from '../../entity/Business';
import { Users } from '../../entity/Users';
import { AppDataSource } from '../../data-source';
const router = express.Router();
const source = AppDataSource.getRepository(Business);