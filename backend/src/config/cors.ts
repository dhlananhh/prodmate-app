import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000", // allow frontend running on port 3000
  methods: [ "GET", "POST", "PUT", "DELETE" ],
  allowedHeaders: [ "Content-Type", "Authorization" ],
  credentials: true, // allow cookies/authorization headers
};

export default cors(corsOptions);
