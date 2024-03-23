'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editRoomAction } from './actions';
import { useParams } from 'next/navigation';
import { Room } from '@/db/schema';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500),
  githubRepo: z.string().url(),
  language: z.string().min(1).max(150),
});

export function EditRoomForm({ room }: { room: Room }) {
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? '',
      githubRepo: room.githubRepo ?? '',
      language: room.language,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editRoomAction({
      id: params.roomId as string,
      ...values,
    });
    toast({
      title: 'Room Updated!',
      description: 'Your room has been updated successfully.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="DevFinder Room 1" />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="A room for developers to code together."
                />
              </FormControl>
              <FormDescription>
                Describe what you'll be coding on & what it's about.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/FALAK097/devfinder"
                />
              </FormControl>
              <FormDescription>
                Put a link to the project you are working on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript, next.js, tailwind" />
              </FormControl>
              <FormDescription>
                List your languages, frameworks, libraries to help others find
                your room.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
