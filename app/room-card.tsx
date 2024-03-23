'use client';

import Link from 'next/link';
import { GithubIcon } from 'lucide-react';

import { splitTags } from '@/lib/utils';
import { Room } from '@/db/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TagList } from '@/components/tags-list';

export function RoomCard({ room }: { room: Room }) {
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
