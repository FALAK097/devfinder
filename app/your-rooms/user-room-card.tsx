'use client';

import Link from 'next/link';
import { GithubIcon, PencilIcon, TrashIcon } from 'lucide-react';

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TagList } from '@/components/tags-list';
import { deleteRoomAction } from './actions';

export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader className="relative">
        <Button size="icon" className="absolute top-2 right-2">
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagList tags={splitTags(room.language)} />
        <div className="flex flex-col">
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex gap-2 mb-4"
              target="_blank"
              rel="noopener noreferrer">
              <GithubIcon />
              GitHub Project
            </Link>
          )}
          <div className="flex items-center gap-2 justify-between">
            <Button asChild>
              <Link href={`rooms/${room.id}`}>Join Room</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>
                  <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your room and any data associated with it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteRoomAction(room.id);
                    }}>
                    Yes, delete it.
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
