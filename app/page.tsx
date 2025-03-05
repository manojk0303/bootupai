import Link from 'next/link';
import { ShieldCheck, Link2, UserPlus, Zap } from 'lucide-react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@/components/auth/sign-in-button';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6">
        {/* Hero Section */}
<section className="max-w-6xl w-full text-center flex flex-col justify-center min-h-[calc(100vh-9rem)] py-12">
  <div className="flex items-center justify-center gap-2 mb-4">
    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
    <span className="text-xs sm:text-sm font-medium text-green-600">
      Transparent & Secure
    </span>
  </div>
  
  <div className="mb-6 sm:mb-8">
    <h1 className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-6xl font-bold inline-block">
      Never Miss Out on Referral Earnings
      <br className="md:hidden" /> 
      <span className="inline-block">Again</span>
    </h1>
  </div>
  
  <p className="text-lg mt-10 sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
    Automate your referral process with a single link. Share it, and let your audience
    sign up effortlessly—no missed referrals, no lost earnings.
  </p>

  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
    <Button size="lg" className="gap-2 w-full sm:w-auto">
      Get Started
      <ArrowRightIcon className="h-4 w-4" />
    </Button>
    <Button variant="outline" size="lg" asChild className="w-full sm:w-auto mt-2 sm:mt-0">
      <Link href="#how-it-works">
        How It Works
      </Link>
    </Button>
  </div>
</section>

        {/* Features Grid */}
        <section className="max-w-6xl w-full py-12 sm:py-20 border-t">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Key Features</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
              Everything you need to maximize your referral earnings
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="p-4 sm:p-6 rounded-xl bg-muted/50">
              <Link2 className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4 text-blue-600" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Generate Referral Links</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create a unique link for your audience to sign up with your referral code.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 rounded-xl bg-muted/50">
              <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4 text-green-600" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Effortless Sign-Ups</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your audience simply enters their email and password—no need to remember referral codes.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 rounded-xl bg-muted/50 sm:col-span-2 md:col-span-1">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4 text-purple-600" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Automatic Account Creation</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Accounts are created automatically with your referral code applied.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="max-w-6xl w-full py-12 sm:py-20 border-t">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How It Works</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
              A simple, transparent process to ensure you never miss out on referral earnings.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            {[
              {
                step: '1',
                title: 'Login & Generate Link',
                description: 'Sign in, enter your referral code, and generate a unique link for your audience.',
              },
              {
                step: '2',
                title: 'Share Your Link',
                description: 'Share the link with your audience via email, social media, or anywhere else.',
              },
              {
                step: '3',
                title: 'Automatic Sign-Ups',
                description: 'Your audience enters their email and password, and their account is created with your referral code applied.',
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="flex-1 p-6 sm:p-8 rounded-xl bg-background border">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 sm:mb-6">
                  <span className="text-blue-600 font-bold">{step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency Section */}
        <section className="max-w-6xl w-full py-12 sm:py-20 border-t">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Transparent & Secure</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
              We don&apos;t store any data from your audience. Their credentials are used only to create their account and apply your referral code.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl w-full py-12 sm:py-20 text-center px-2">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-1">
            <div className="bg-background rounded-2xl p-6 sm:p-8 md:p-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                Start Earning More from Referrals
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Generate your referral link today and never miss out on free earnings again.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <SignInButton>
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Get Started 
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </SignInButton>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Link href="/dashboard/create-referral">
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}