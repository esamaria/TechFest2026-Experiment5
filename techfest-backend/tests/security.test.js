import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeMongoInput, createRateLimiter } from "../middleware/security.js";

test("removes MongoDB operator and dotted keys recursively", () => {
  const input = {
    name: "TechFest",
    profile: { "$where": "malicious", "safe.field": "blocked", city: "Trivandrum" },
    tags: ["one", { "$gt": "" }]
  };
  assert.deepEqual(sanitizeMongoInput(input), {
    name: "TechFest",
    profile: { city: "Trivandrum" },
    tags: ["one", {}]
  });
});

test("rate limiter blocks requests after configured maximum", () => {
  const limiter = createRateLimiter({ windowMs: 60000, max: 1 });
  const makeResponse = () => ({
    headers: {},
    statusCode: 200,
    body: null,
    setHeader(key, value) { this.headers[key] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  });
  let nextCalls = 0;
  const req = { ip: "test-client", socket: {} };
  const first = makeResponse();
  limiter(req, first, () => nextCalls++);
  const second = makeResponse();
  limiter(req, second, () => nextCalls++);
  assert.equal(nextCalls, 1);
  assert.equal(second.statusCode, 429);
});
