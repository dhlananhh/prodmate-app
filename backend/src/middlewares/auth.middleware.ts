import {
  Request,
  Response,
  NextFunction
} from "express";
import jwt, {
  TokenExpiredError,
  JsonWebTokenError
} from "jsonwebtoken";
import { publicKey } from "../config/keys";


// mở rộng type cho req.user để tránh dùng any
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string };
    }
  }
}


/**
 * Middleware to authenticate user via JWT
 * - Hỗ trợ cả cookie và Authorization header
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.split(" ")[ 1 ];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      publicKey,
      { algorithms: [ "RS256" ] }
    ) as {
      id: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
}


/**
 * Middleware to authorize user roles
 */
export function authorize(roles: string[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient role"
      });
    }
    next();
  };
}
