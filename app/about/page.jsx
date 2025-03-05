import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';
import { UsersIcon, ShieldCheckIcon, SparklesIcon, RocketIcon } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center px-4 sm:px-6">
        {/* Hero Section */}
        <section className="max-w-6xl w-full py-12 sm:py-20 md:py-28">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Bootup AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re on a mission to help creators and entrepreneurs maximize their referral earnings through simple, transparent technology.
            </p>
          </div>
<br />
        </section>

        {/* Values Section */}
        <section className="max-w-6xl w-full py-12 sm:py-20 border-t">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer support.
            </p>
            <br />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl border bg-background">
              <div className="flex items-center gap-3 mb-4">
                <UsersIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold">Creator-First Approach</h3>
              </div>
              <p className="text-muted-foreground">
                We build our products with creators&apos; needs at the center, ensuring our solutions truly solve real problems.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-background">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold">Radical Transparency</h3>
              </div>
              <p className="text-muted-foreground">
                We&apos;re upfront about what we do, how we do it, and the value we provide. No hidden fees or unclear terms.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-background">
              <div className="flex items-center gap-3 mb-4">
                <SparklesIcon className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold">Continuous Improvement</h3>
              </div>
              <p className="text-muted-foreground">
                We&apos;re constantly iterating and improving our products based on user feedback and industry trends.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border bg-background">
              <div className="flex items-center gap-3 mb-4">
                <RocketIcon className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-semibold">Empowering Creators</h3>
              </div>
              <p className="text-muted-foreground">
                Our ultimate goal is to empower creators to build sustainable businesses through their influence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}   