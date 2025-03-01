'use client';

import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form
} from '@/components/ui/form';
import { UpdateProfileSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { updateProfile } from '@/actions/update-profile';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function UpdateProfileForm() {
  const user = useCurrentUser();
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.tempEmail ? user.tempEmail : user?.email ? user.email : '',
    }
  });

  const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
    startTransition(() => {
      updateProfile(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Oops! Something went wrong.'));
    });
  };

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>

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
