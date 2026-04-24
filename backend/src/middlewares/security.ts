import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";


// helmet: bảo vệ http headers
export const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});


// cors: whitelist multiple domains (staging + production)
const allowedOrigins = [ "http://localhost:3000" ];


// cors: cho phép frontend gọi api
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    } else {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  methods: [ "GET", "POST", "PUT", "DELETE" ],
  credentials: true,
});


// rate limiting: giới hạn số request để chống DDoS/brute force
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  limit: 100, // tối đa 100 request mỗi IP trong 15 phút
  message: {
    success: false,
    error: {
      message: "Too many requests. Please try again later!",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
})


// middleware tổng hợp
export const security = {
  helmetMiddleware,
  corsMiddleware,
  rateLimiter,
}
