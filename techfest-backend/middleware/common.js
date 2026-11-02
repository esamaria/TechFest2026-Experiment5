export function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
}

export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || (err.name === "ValidationError" ? 400 : 500);
  const message = status >= 500 && process.env.NODE_ENV === "production"
    ? "Internal server error"
    : (err.message || "Internal server error");
  res.status(status).json({ success: false, message });
}
