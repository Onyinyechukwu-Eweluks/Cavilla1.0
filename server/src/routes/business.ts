import * as express from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Business } from "../entity/Business";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
const router = express.Router();
const source = AppDataSource.getRepository(Business);


router.get("/business", async (req, res, next) => {
  try {
    const business = await source.find({
      relations: {
        employees: true,
      },
    });
    if (business) {
      res.json(business);
    } else {
      res.send("No business found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/business/:id", async (req, res, next) => {
  try {
    const business = await source.findOneBy({ id: parseInt(req.params.id) });
    res.json(business);
  } catch (error) {
    res.send(error);
  }
});

router.get("/sortBusiness", async (req: Request, res: Response, next) => {
  try {
    const value = {
      businessName: req.body.businessName,
      ownerName: req.body.ownerName,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      mobileNumber: req.body.mobileNumber,
      officeNumber: req.body.officeNumber,
      email: req.body.email,
      category: req.body.category,
      lisence: req.body.lisence,
      description: req.body.description,
      password: req.body.password,
    };
    const business = await source.findBy(value);
    res.json(business);
  } catch (error) {
    res.send(error);
  }
});

router.put("/business/:id", async (req: Request, res: Response, next) => {
  try {
    const business = await source.findOneBy({ id: parseInt(req.params.id) });
    if (business) {
      source.merge(business!, req.body);
      const result = await source.save(business!);
      res.send(result);
    } else {
      res.send("Business not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.patch("/business/:id", async (req: Request, res: Response, next) => {
  try {
    const business = await source.findOneBy({ id: parseInt(req.params.id) });
    if (business) {
      source.merge(business!, req.body);
      const result = await source.save(business!);
      res.send(result);
    } else {
      res.send("Business not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/business/:id", async (req: Request, res: Response, next) => {
  try {
    const business = await source.findOneBy({ id: parseInt(req.params.id) });
    if (business) {
      const result = await source.delete({ id: parseInt(req.params.id) });
      return res.json(result);
    }
  } catch (error) {
    res.send(error);
  }
});

//register
router.post("/business/register", async (req: Request, res: Response, next) => {
  try {
    const business = await source.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (business) {
      return res.send("Business already exist please logIn");
    }
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const addBusiness = await source.create({ ...req.body, password: hashed})
    const result = await source.save(addBusiness);
    return res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//login
router.post("/business/login", async (req: Request, res: Response, next) => {
  try {
    const business = await source.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!business) {
      res.statusCode = 404;
      return res.send("Business does not exist please register");
    }
    const validPassword = bcrypt.compare(req.body.password, business.password);
    if (!validPassword) {
      res.statusCode = 401;
      return res.send("Email and password does not match");
    }
    const accessToken = jwt.sign(
      { email: business.email, id: business.id },
      "importantSecretKey",
      { expiresIn: 60 * 60 }
    );
    return res.send({ token: accessToken, message: "Login Successfully" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
