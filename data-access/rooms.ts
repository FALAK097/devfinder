// * why did we create this file?
// next-js on build would not treat the page as static and would be dynamic if we did not use the unstable_noStore function. This is because the getRooms function is an async function and would not be treated as a static page. This would cause the page to be re-rendered on every request. This is not ideal because the data does not change often and we would like to cache the data to improve performance. We can use the unstable_noStore function to tell next-js to treat the page as static and cache the data. This will improve performance by not re-rendering the page on every request.

import { db } from '@/db';
import { Room, room } from '@/db/schema';
import { eq, like } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.language, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error('User not authenticated');
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, 'id' | 'userId'>,
  userId: string
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}
