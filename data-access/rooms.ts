// * why did we create this file?
// next-js on build would not treat the page as static and would be dynamic if we did not use the unstable_noStore function. This is because the getRooms function is an async function and would not be treated as a static page. This would cause the page to be re-rendered on every request. This is not ideal because the data does not change often and we would like to cache the data to improve performance. We can use the unstable_noStore function to tell next-js to treat the page as static and cache the data. This will improve performance by not re-rendering the page on every request.

import { unstable_noStore } from 'next/cache';
import { db } from '@/db';
import { room } from '@/db/schema';
import { eq, like } from 'drizzle-orm';

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(room.language, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
