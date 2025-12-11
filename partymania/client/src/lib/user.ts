// client/src/lib/user.ts
import { v4 as uuidv4 } from "uuid";

export function getOrCreateUserId(): string {
  const cookieName = "playerId";
  const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
  if (match) return match[2];

  const newId = uuidv4();
  document.cookie = `${cookieName}=${newId}; path=/; SameSite=Lax`;
  return newId;
}
