import Link from 'next/link';
import Image from 'next/image';

interface AuthHeaderProps {
  label: string;
}

export function AuthHeader({ label }: AuthHeaderProps) {
  return (
    <div className='w-full flex flex-col gap-y-3 items-center justify-center'>
      <Link href='/' className='flex items-center'>
      <Image src="/logo.png" alt="Bootup AI Logo" width={32} height={32} />

        <h1 className='text-4xl ml-3 font-bold'>Bootup AI</h1>
      </Link>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}

