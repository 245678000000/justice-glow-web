type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * 简易滑动窗口限流，按调用方 IP 计数。
 *
 * 注意：状态保存在单个 Edge Function 实例的内存中，实例回收或水平扩容后会重置，
 * 只能挡住最朴素的滥用。若需要严格限流，请改用 Redis / Postgres 等共享存储。
 */
export function rateLimit(req: Request, limit: number, windowMs: number): boolean {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}
