import Link from 'next/link';
import { GithubIcon } from 'lucide-react';

import { Room } from '@/db/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRooms } from '@/data-access/rooms';
import { TagList } from '@/components/tags-list';
import { SearchBar } from './browse/search-bar';
import { unstable_noStore } from 'next/cache';
import { splitTags } from '@/lib/utils';

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagList tags={splitTags(room.language)} />
        <div className="flex flex-col">
          {room.githubRepo && (
            <div className="flex items-center gap-2 justify-between">
              <Link
                href={room.githubRepo}
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer">
                <GithubIcon />
                GitHub Project
              </Link>
              <Button asChild>
                <Link href={`rooms/${room.id}`}>Join Room</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
