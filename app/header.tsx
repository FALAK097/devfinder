'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function AccountDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'link'}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ''} />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>

          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }>
          <LogOutIcon className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-2 container mx-auto">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline">
          <Image
            src="/icon.png"
            alt="Application logo"
            width="60"
            height="60"
          />
          DevFinder
        </Link>

        <nav>
          <Link href="/your-rooms" className="hover:underline">
            Your Rooms
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {session.data && <AccountDropdown />}
          {!session.data && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
