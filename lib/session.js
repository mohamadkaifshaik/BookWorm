import { cookies } from "next/headers";
import { verifyToken, AUTH_COOKIE } from "./auth";

// Returns the authenticated user's id, or null if not signed in.
export async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload?.sub || null;
}
