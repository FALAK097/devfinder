'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogInIcon, LogOutIcon } from 'lucide-react';

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger> {session.data?.user?.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn('google')}>
            <LogInIcon /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-4 container mx-auto">
      <div className="flex justify-between items-center">
        <div>LOGO</div>
        <div>
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
