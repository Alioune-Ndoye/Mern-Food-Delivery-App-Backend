declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
    }
  }
}

export {};