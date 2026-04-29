import {
  Request,
  Response,
  NextFunction
} from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "supersecret";


export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }

  // const authHeader = req.headers.authorization;
  // if (!authHeader) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "No token provided"
  //   });
  // }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
}


export function authorize(roles: string[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient role"
      });
    }
    next();
  }
}
