import { Request, Response, NextFunction } from "express";


const handleValidError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).send('Internal Server Error');
}

export const validateMyUserRequest = (req: Request, res: Response, next: NextFunction) => {
  const { name, addressLine1, city, country } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: "Name is required and must be a non-empty string" });
  }

  if (!addressLine1 || typeof addressLine1 !== 'string' || addressLine1.trim().length === 0) {
    return res.status(400).json({ message: "Address Line 1 is required and must be a non-empty string" });
  }

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    return res.status(400).json({ message: "City is required and must be a non-empty string" });
  }

  if (!country || typeof country !== 'string' || country.trim().length === 0) {
    return res.status(400).json({ message: "Country is required and must be a non-empty string" });
  }

  next();
};