'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { badgeVariants } from './ui/badge';

export function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          className={cn(badgeVariants())}
          key={tag}
          onClick={() => router.push(`/?search=${tag}`)}>
          {tag}
        </button>
      ))}
    </div>
  );
}
