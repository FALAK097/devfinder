import { Button } from '@/components/ui/button';
import { db } from '@/db';
import Link from 'next/link';

export default async function Home() {
  const items = await db.query.testing.findMany();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </main>
  );
}