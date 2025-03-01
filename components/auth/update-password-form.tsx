'use client';

import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useState, useTransition, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UpdatePasswordSchema } from '@/schemas';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useCurrentUser } from '@/hooks/use-current-user';
import { updatePassword } from '@/actions/update-password';
import { Card, CardContent } from '@/components/ui/card';

export default function UpdatePasswordForm() {
  const user = useCurrentUser();
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // Clear error and success messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(undefined);
        setSuccess(undefined);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    startTransition(() => {
      updatePassword(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            form.reset(); // Reset form after successful update
          }
        })
        .catch(() => setError('Oops! Something went wrong.'));
    });
  };

  // If user is authenticated via OAuth (Google, etc.)
  if (user?.isOAuth) {
    return (
      <Card className="p-4">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              You are signed in with an external provider . Password management is handled by that service, so you don't need to set a password here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='••••••••'
                    autoComplete='current-password'
                    type='password'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='••••••••'
                    type='password'
                    autoComplete='new-password'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='••••••••'
                    type='password'
                    autoComplete='new-password'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type='submit' className='w-full'>
          {isPending && (
            <>
              <Loader2 className='animate-spin mr-2' size={18} />
              Saving...
            </>
          )}
          {!isPending && <>Save</>}
        </Button>
      </form>
    </Form>
  );
}