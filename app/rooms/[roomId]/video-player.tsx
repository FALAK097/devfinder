'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Room } from '@/db/schema';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { generateTokenAction } from './actions';
import { useRouter } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY || '';

export function DevFinderVideo({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!room || !session.data) return;

    const userId = session.data.user.id;
    const user = {
      id: userId,
      name: session.data.user.name || '',
      image: session.data.user.image || '',
    };

    const options = {
      apiKey,
      user,
      tokenProvider: () => generateTokenAction(),
    };

    const streamClient = new StreamVideoClient(options);
    const call = streamClient.call('default', room.id);
    call.join({ create: true });

    setClient(streamClient);
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => streamClient.disconnectUser())
        .catch(console.error);
    };
  }, [session, room, apiKey]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls onLeave={() => router.push('/browse')} />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
