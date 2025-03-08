'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AirtableSignupForm({ service, creator }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [workspaceName, setWorkspaceName] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusUrl, setStatusUrl] = useState('')
  const [passwordValidation, setPasswordValidation] = useState({
    length: false
  })

  // Password validation
  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8
    })
  }, [password])

  // Check if password meets all requirements
  const isPasswordValid = Object.values(passwordValidation).every(Boolean)

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
  
    try {
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,      'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY},
        body: JSON.stringify({ 
          email, 
          password, 
          name,
          slug: window.location.pathname.split('/r/')[1] ,
          service
        })
      })
  
      const data = await response.json()

      
      if (!response.ok) throw new Error(data.error || 'Signup failed')
  
      setAccountCreated(true)
      setShowToast(true)
      setStatusUrl(data.get('statusUrl'))
  
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-fade-in">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-4 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Request Submitted Successfully!</h3>
                <div className="mt-1 text-sm text-green-700">
                  <p>{statusMessage || "Your request has been queued. You'll receive an email with your credentials once the account is created."}</p>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setShowToast(false)}
                    className="text-xs font-medium text-green-600 hover:text-green-500"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg bg-white py-8 px-6 shadow-xl sm:rounded-lg sm:px-10 relative overflow-hidden transition-all duration-300">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <h1 className="mt-2 text-center text-3xl font-extrabold text-gray-900 mb-8">
            Join {service} via {creator}&apos;s referral
          </h1>
        </div>
    
        {accountCreated ? (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="rounded-md bg-green-50 p-6 relative z-10">
              <div className="flex justify-center">
                <svg className="h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-xl font-bold text-green-800">Request Queued Successfully!</h3>
              <div className="mt-4 text-sm text-green-700 space-y-3">
                <p className="font-medium">Your account request is being processed. Check your email soon!</p>
                <p>You&apos;ll receive an email with your login credentials once your account is created.</p>
                
                <div className="mt-4 p-3 bg-white rounded-md border border-green-200">
                  <p className="text-gray-700 font-medium mb-1">Track your request status: {statusUrl}</p>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono overflow-auto">
                    {statusMessage || "Your creation request will be processed soon"}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              
              <div className="mt-2">
                <p className="text-sm text-gray-600 font-medium">Password requirements:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                  <div className={`text-xs flex items-center ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                    <svg className={`h-4 w-4 mr-1 ${passwordValidation.length ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                      {passwordValidation.length ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      )}
                    </svg>
                    At least 8 characters
                  </div>
                </div>
              </div>
            </div>

            
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting || !email || !isPasswordValid || !name}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              style={{ backgroundColor: '#16a34a' }}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}
    
        <p className="mt-6 text-xs text-center text-gray-600 relative z-10">
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}