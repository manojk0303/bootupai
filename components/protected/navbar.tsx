// @components/Navbar.tsx
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/auth/user-button';

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  credits: number;
}

export function Navbar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navLinks = [
    {
      href: '/dashboard/create-referral',
      label: 'Create Referral'
    },
    {
      href: '/referral',
      label: 'View Referral'
    },
    {
      href: '/bulk-creation',
      label: 'Bulk Creation'
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80'>
      <div className='mx-auto flex h-16 items-center px-4'>
        <Link 
          href='/dashboard/create-referral' 
          className='flex items-center space-x-2'
        >
          <img src={"/logo.png"} className='h-8 w-8' alt="Bootup AI Logo"/>
          <span className='hidden text-xl font-bold sm:inline-block'>
            Bootup AI
          </span>
        </Link>

        {/* Mobile Menu */}
        <div className='sm:hidden ml-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      'w-full cursor-pointer',
                      pathname === link.href && 'text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              {/* Add credits display in mobile menu */}
              <DropdownMenuItem className="cursor-default opacity-60">
                {isLoading ? 'Loading credits...' : `Credits: ${userData?.credits || 0}`}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Menu */}
        <div className='hidden sm:flex items-center space-x-6 ml-8'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className='ml-auto flex items-center space-x-4'>
          {/* Credits display for desktop */}
          <div className="hidden sm:flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {isLoading ? 'Loading...' : `${userData?.credits || 0} Credits`}
          </div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}