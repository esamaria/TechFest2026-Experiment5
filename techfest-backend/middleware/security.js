// Lightweight security middleware using Node/Express built-ins.
// This project authenticates API requests with Bearer JWTs (not cookies),
// so browser CSRF protections for cookie sessions are not applicable.
export function securityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
}

export function sanitizeMongoInput(value) {
  if (Array.isArray(value)) return value.map(sanitizeMongoInput);
  if (value && typeof value === "object") {
    const clean = {};
    for (const [key, item] of Object.entries(value)) {
      if (key.startsWith("$") || key.includes(".") || ["__proto__", "prototype", "constructor"].includes(key)) continue;
      clean[key] = sanitizeMongoInput(item);
    }
    return clean;
  }
  return value;
}

export function sanitizeRequest(req, res, next) {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeMongoInput(req.body);
  }
  next();
}

// Simple per-process rate limiter. For multi-instance deployments, use a
// shared store (for example Redis) instead of this in-memory implementation.
export function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 100 } = {}) {
  const clients = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    let entry = clients.get(key);
    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
      clients.set(key, entry);
    }
    entry.count += 1;
    res.setHeader("RateLimit-Limit", String(max));
    res.setHeader("RateLimit-Remaining", String(Math.max(0, max - entry.count)));
    if (entry.count > max) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later."
      });
    }
    next();
  };
}
