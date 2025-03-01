import { UserCog } from 'lucide-react';

import { currentUser } from '@/lib/authentication';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import UpdatePasswordForm from '@/components/auth/update-password-form';

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <>
      <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4 flex items-center'>
        <UserCog className='mr-2 w-6 md:w-8 h-auto' />
        Update Password
      </h2>
      {user?.isOAuth === false && (
        <Card className='w-full mt-6'>
          <CardHeader>
            <h3 className='font-semibold'>Update Password</h3>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </Card>
      )}
      {user?.isOAuth !== false && (
        <Card className="p-4">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              You are signed in with an external provider. Password management is handled by that service, so you don't need to set a password here.
            </p>
          </div>
        </CardContent>
      </Card>
      )

      }
    </>
  );
}
