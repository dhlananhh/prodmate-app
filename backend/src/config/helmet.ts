import helmet from "helmet";

const helmetConfig = helmet({
  contentSecurityPolicy: false, // disable CSP if you serve frontend separately
  crossOriginEmbedderPolicy: false, // disable if you use external resources
});

export default helmetConfig;
