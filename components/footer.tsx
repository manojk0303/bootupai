
export function Footer() {
  return (

      <footer className="border-t py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-bold text-lg">Bootup AI</p>
              <p className="text-sm text-gray-600">© {new Date().getFullYear()} Bootup AI. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="/terms" className="text-sm text-gray-600 hover:text-blue-600">Terms</a>
              <a href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Privacy</a>
              <a href="/contact" className="text-sm text-gray-600 hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
  );
}
