import { TagList } from '@/components/tags-list';
import { getRoom } from '@/data-access/rooms';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { DevFinderVideo } from './video-player';
import { splitTags } from '@/lib/utils';
import { unstable_noStore } from 'next/cache';

export default async function RoomPage(props: { params: { roomId: string } }) {
  unstable_noStore();
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return (
      <div className="flex justify-center items-center text-4xl p-40">
        Room Not Found 😢
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <DevFinderVideo room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base text-center">{room?.name} </h1>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-sm"
              target="_blank"
              rel="noopener noreferrer">
              <GithubIcon /> GitHub Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description} </p>

          <TagList tags={splitTags(room.language)} />
        </div>
      </div>
    </div>
  );
}
