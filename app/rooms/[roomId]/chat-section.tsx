'use client';

import { useEffect, useState } from 'react';
import { ChannelSort, DefaultGenerics, StreamChat } from 'stream-chat';
import { useSession } from 'next-auth/react';
import 'stream-chat-react/dist/css/v2/index.css';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';
import { Room } from '@/db/schema';
import { generateTokenAction } from './actions';

interface ChatSectionProps {
  room: Room;
}

export function DevFinderChat({ room }: ChatSectionProps) {
  const session = useSession();
  const [channel, setChannel] = useState<StreamChat<DefaultGenerics> | null>(
    null
  );

  useEffect(() => {
    async function initializeChat() {
      if (!session.data || !room) return;

      // Dummy user data
      const userId = session.data.user.id;
      const user = {
        id: userId,
        name: 'Dummy User',
        image: 'https://dummyimage.com/100x100/000/fff',
      };

      const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY || '';

      try {
        const token = await generateTokenAction();
        const newClient = new StreamChat(apiKey);
        newClient.connectUser(user, token);

        // Dummy channel creation
        const channel = newClient.channel('messaging', room.id, {
          name: room.name,
        });
        await channel.watch();

        setChannel(newClient);
      } catch (error: any) {
        console.error('Error initializing chat:', error.message);
        // Handle error
      }
    }

    initializeChat();
  }, [session, room]);

  if (!channel) return <div>Loading...</div>;

  const filters = {
    cid: { $in: [room.id] },
    type: 'messaging',
  };

  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 } as ChannelSort<DefaultGenerics>;

  return (
    <Chat client={channel}>
      <ChannelList sort={sort} filters={filters} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}
