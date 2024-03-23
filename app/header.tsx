'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogInIcon, LogOutIcon, TrashIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { deleteAccountAction } from './action';
import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and any data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: '/' });
              }}>
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}>
            <TrashIcon className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-2 z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
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

        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link href="/browse" className="hover:underline">
                Browse
              </Link>

              <Link href="/your-rooms" className="hover:underline">
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
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
