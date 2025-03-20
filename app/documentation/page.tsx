// app/documentation/page.jsx
import Documentation from '../../components/Documentation';
import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';
export const metadata = {
  title: 'Documentation | Bootup AI',
  description: 'Learn how to use Bootup AI to create accounts with your referral ID for your audience',
};

export default function DocumentationPage() {
  return( 
  <>
  <Navbar/>
  <Documentation />
  <Footer/>
  </>
  );
}