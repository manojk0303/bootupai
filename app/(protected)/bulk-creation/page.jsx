'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PipedreamBulkUpload from '../../../components/bulk-services/PipedreamBulkUpload'
import AirtableBulkUpload from '../../../components/bulk-services/AirtableBulkUpload'
export default function ServiceSelectionPage() {
  const [selectedService, setSelectedService] = useState(null)
  const router = useRouter()
  
  // Services data - easily expandable for future services
  const services = [
    {
      id: 'pipedream',
      name: 'Pipedream',
      description: 'Connect APIs, remarkably fast. Build and deploy workflows with built-in apps and code.',
      requirements: 'Email, password (12+ chars with special chars, numbers, uppercase), building purpose'
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Organize anything, with anyone, from anywhere.',
      requirements: 'Email, password (8+ chars), name'
    }
    // Future services can be added here
    // {
    //   id: 'zapier',
    //   name: 'Zapier',
    //   description: 'Easy automation for busy people.',
    //   logoUrl: 'https://zapier.com/logo.png',
    //   requirements: 'Email, name, etc.'
    // },
  ]

  // Render the selected service's upload component
  const renderServiceComponent = () => {
    switch(selectedService) {
      case 'pipedream':
        return <PipedreamBulkUpload />
      case 'airtable':
        return <AirtableBulkUpload />
      // Add cases for future services
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-4xl">
            Bulk Account Creation
          </h1>
          <p className="mt-3 text-base sm:text-xl text-gray-600">
            Select a service and upload your data file to create multiple accounts at once
          </p>
        </div>

        {!selectedService ? (
          <div className="space-y-4 sm:space-y-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg border border-gray-100"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="flex-1 min-w-0 mr-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {service.name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {service.description}
                      </p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800">
                        Available for bulk creation
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                    <button
  type="button"
  onClick={() => setSelectedService(service.id)}
  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-2 border border-green-600 text-sm font-semibold rounded-lg shadow-md text-green-700 bg-green-100 hover:bg-green-600 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
>
  Select
</button>


                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Heading and Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {services.find(s => s.id === selectedService)?.name} Bulk Upload
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Upload a file containing account information
              </p>
            </div>
        
            {/* Back Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-lg shadow-md text-green-700 bg-green-100 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
            >
              ← Back to Services
            </button>
          </div>
        
          {/* Divider */}
          <div className="border-t border-gray-200 mt-10"></div>
        
          {/* Service Component */}
          <div className="p-4 sm:p-6">{renderServiceComponent()}</div>
        </div>
        
        )}
        
        {/* Additional info card
        <div className="mt-8 bg-blue-50 rounded-lg shadow-sm p-4 border border-blue-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Need help with bulk account creation? Check our documentation for file format guidelines.
              </p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <a href="#" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                  View docs <span aria-hidden="true">→</span>
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}