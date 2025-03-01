// layout.js
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/protected/navbar';

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-1 py-8 mt-10 '>
              <div className='mx-auto w-full  max-w-4xl rounded-xl border bg-white p-4 sm:p-6 shadow-lg dark:bg-gray-800'>
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}