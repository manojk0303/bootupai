// components/bulk-services/PipedreamBulkUpload.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import credentials from '@/config/credentials'
export default function PipedreamBulkUpload() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [parseError, setParseError] = useState('')
  const [accountsData, setAccountsData] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [processingStatus, setProcessingStatus] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
//   REFERAL
  const [referralLinks, setReferralLinks] = useState([])
  const [selectedReferralId, setSelectedReferralId] = useState('')
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(false)
  const [referralError, setReferralError] = useState('')
  const selectedService = 'AIRTABLE';

  const fileInputRef = useRef(null)
  const router = useRouter()


  // Add this function to fetch referral links
const fetchReferralLinks = async (service) => {
    setIsLoadingReferrals(true)
    setReferralError('')
    
    try {
      const response = await axios.get(`/api/referral/service/${service}`)
      if (response.data.status === 'success') {
        setReferralLinks(response.data.referralLinks)
        
        // Auto-select the first referral link if available
        if (response.data.referralLinks.length > 0) {
          setSelectedReferralId(response.data.referralLinks[0].id)
        } else {
          setSelectedReferralId('')
          alert("you need to create referal link for airtable from create-referal section")
        }
      }
    } catch (error) {
      console.error('Error fetching referral links:', error)
      setReferralError('Failed to load referral links. Please try again.')
    } finally {
      setIsLoadingReferrals(false)
    }
  }
  
  // Add this useEffect to load referral links when the component mounts
  useEffect(() => {
    fetchReferralLinks(selectedService)
  }, []) // Re-fetch when service changes

  

  // Reset file and related states
  const resetFile = () => {
    setFile(null)
    setFileName('')
    setAccountsData([])
    setValidationErrors({})
    setProcessingStatus([])
    setParseError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
    // Handle file selection
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return
        
        setFile(selectedFile)
        setFileName(selectedFile.name)
        
        // Parse file based on extension
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase()
        
        if (fileExtension === 'csv') {
          parseCSV(selectedFile)
        } else if (fileExtension === 'json') {
          parseJSON(selectedFile)
        } else {
          setParseError('Unsupported file format. Please upload a CSV or JSON file.')
          resetFile()
        }
      }
    
      // Parse CSV file
      const parseCSV = (file) => {
        const reader = new FileReader()
        
        reader.onload = (e) => {
          try {
            const text = e.target.result
            const rows = text.split('\n')
            const headers = rows[0].split(',').map(header => header.trim())
            
            // Check if required headers exist
            const requiredHeaders = ['email', 'password', 'name']
            const missingHeaders = requiredHeaders.filter(header => !headers.includes(header))
            
            if (missingHeaders.length > 0) {
              setParseError(`Missing required headers: ${missingHeaders.join(', ')}`)
              return
            }
            
            // Parse data rows
            const data = []
            for (let i = 1; i < rows.length; i++) {
              if (!rows[i].trim()) continue // Skip empty rows
              
              const values = rows[i].split(',').map(value => value.trim())
              if (values.length !== headers.length) {
                setParseError(`Row ${i} has incorrect number of columns`)
                return
              }
              
              const rowData = {}
              headers.forEach((header, index) => {
                rowData[header] = values[index]
              })
              
              data.push(rowData)
            }
            
            setAccountsData(data)
            validateData(data)
          } catch (error) {
            console.error('CSV parsing error:', error)
            setParseError('Error parsing CSV file. Please check the format.')
          }
        }
        
        reader.readAsText(file)
      }
    
      // Parse JSON file
      const parseJSON = (file) => {
        const reader = new FileReader()
        
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result)
            
            // Check if data is an array
            if (!Array.isArray(data)) {
              setParseError('JSON file must contain an array of objects')
              return
            }
            
            // Check if each object has required fields
            const requiredFields = ['email', 'password', 'name']
            const invalidEntries = data.findIndex(entry => 
              !requiredFields.every(field => Object.keys(entry).includes(field))
            )
            
            if (invalidEntries !== -1) {
              setParseError(`Entry at index ${invalidEntries} is missing required fields`)
              return
            }
            
            setAccountsData(data)
            validateData(data)
          } catch (error) {
            console.error('JSON parsing error:', error)
            setParseError('Error parsing JSON file. Please check the format.')
          }
        }
        
        reader.readAsText(file)
      }
    
      // Validate all account data
      const validateData = (data) => {
        const errors = {}
        
        data.forEach((account, index) => {
          const accountErrors = []
          
          // Email validation
          if (!account.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email)) {
            accountErrors.push('Invalid email format')
          }
          
          // Password validation
          if (!account.password) {
            accountErrors.push('Password is required')
          } else {
            const passwordErrors = []
            if (account.password.length < 8) passwordErrors.push('min 8 chars')
            if (passwordErrors.length > 0) {
              accountErrors.push(`Password missing: ${passwordErrors.join(', ')}`)
            }
          }
          
          // Building purpose validation
          if (!account.name || account.name == "") {
            accountErrors.push('Name is required')
          }
          
          if (accountErrors.length > 0) {
            errors[index] = accountErrors
          }
        })
        
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
      }
    

  // Process accounts function (keep the same as before, but update slug extraction)
  const processAccounts = async () => {
    if (Object.keys(validationErrors).length > 0) {
      alert("Please fix validation errors before proceeding")
      return
    }
    
    if (accountsData.length === 0) {
      alert("No valid accounts to process")
      return
    }
    const getSelectedReferralSlug = () => {
        if (!selectedReferralId) {
          setReferralError('Please select a referral link')
          return null
        }
        
        const selectedReferral = referralLinks.find(link => link.id === selectedReferralId)
        return selectedReferral?.slug || null
      }

    // Extract slug from referral link input
    const slug = getSelectedReferralSlug()

    if (!slug) {
      setReferralError('Invalid referral link. Please check the URL format.')
      return
    }

    // Rest of the processAccounts function remains the same...
    // Process each account sequentially
    for (let i = 0; i < accountsData.length; i++) {
        // Update status to processing
        setProcessingStatus(prev => {
          const updated = [...prev]
          updated[i] = { status: 'processing', message: 'Creating account...' }
          return updated
        })
        
        // Calculate and update overall progress
        setOverallProgress(Math.floor((i / accountsData.length) * 100))
        
        try {
          const response = await fetch('/api/create-account/airtable', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY
            },
            body: JSON.stringify({ 
              email: accountsData[i].email, 
              password: accountsData[i].password, 
              name: accountsData[i].name,
              slug: slug,
              service: 'airtable'
            })
          })
          
          const data = await response.json()
          
          if (!response.ok) {
            throw new Error(data.error || 'Account creation failed')
          }
          
          // Update status to success
          setProcessingStatus(prev => {
            const updated = [...prev]
            updated[i] = { 
              status: 'success', 
              message: 'Account queued successfully', 
              statusUrl: data.statusUrl
            }
            return updated
          })
        } catch (error) {
          console.error(`Error creating account for ${accountsData[i].email}:`, error)
          
          // Update status to error
          setProcessingStatus(prev => {
            const updated = [...prev]
            updated[i] = { 
              status: 'error', 
              message: error.message || 'Failed to create account'
            }
            return updated
          })
        }
        
        // Add small delay to prevent overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      // Final progress update
      setOverallProgress(100)
      setIsProcessing(false)
  }
   // Generate sample template for download
   const generateSampleTemplate = (format) => {
    const fileName = `airtable_template.${format}`
    let fileContent = ''
    let fileType = ''
    
    if (format === 'csv') {
      fileContent = 'email,password,Name\n'
      fileContent += 'user1@example.com,SecurePassword1!,John Doe\n'
      fileContent += 'user2@example.com,AnotherSecure2@,Jhonny Deep'
      fileType = 'text/csv'
    } else if (format === 'json') {
      const sampleData = [
        {
          email: 'user1@example.com',
          password: 'SecurePassword1!',
          name: 'John Doe'
        },
        {
          email: 'user2@example.com',
          password: 'AnotherSecure2@',
          name: 'Jhonny Deep'
        }
      ]
      fileContent = JSON.stringify(sampleData, null, 2)
      fileType = 'application/json'
    }
    
    // Create and trigger download
    const blob = new Blob([fileContent], { type: fileType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Updated JSX with improved UI and referral link input
  return (
    <div className="px-0 sm:px-4 py-5 sm:p-6">
      {/* Referral link input */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Referral Link
        </label>
        {isLoadingReferrals ? (
            <div className="py-2 text-gray-500">Loading referral links...</div>
        ) : referralLinks.length > 0 ? (
            <select
            value={selectedReferralId}
            onChange={(e) => setSelectedReferralId(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300"
            >
            {referralLinks.map(link => (
                <option key={link.id} value={link.id}>
                {credentials.domain.slice(0,-1)} {link.url} ({link.signups || 0} signups)
                </option>
            ))}
            </select>
        ) : (
            <div className="py-2 text-amber-600">
            No referral links found for this service. 
            <a href="/dashboard/referrals" className="text-green-600 ml-1 underline">
                Create one now
            </a>
            </div>
        )}
        {referralError && (
            <p className="mt-2 text-sm text-red-600">{referralError}</p>
        )}
      </div>
      {/* Requirements section - place this after the referral link input and before the upload section */}
      <div className="mt-6 mb-8 bg-blue-50 rounded-lg sm:p-8 p-6 border border-blue-200 shadow-sm">
        <h3 className="text-lg font-medium text-blue-800 mb-3">Account Requirements</h3>
        
        <div className="space-y-4">
          <div className="bg-white rounded-md sm:p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Must not already have a Airtable account.
            </p>
          </div>

          <div className="bg-white rounded-md sm:p-4 p-2 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1 ml-4 list-disc">
              <li>Minimum 8 characters</li>
            </ul>
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Name
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Should be a valid name
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 shadow rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Account Data</h2>
        
        {/* Download Template Section */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">Download Template</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => generateSampleTemplate('csv')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              CSV
            </button>
            <button
              onClick={() => generateSampleTemplate('json')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              JSON
            </button>
          </div>
        </div>
        
        {/* File Upload Input */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Upload File (CSV/JSON)
          </label>
          <input 
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {fileName && (
            <div className="mt-2 flex items-center gap-3">
              <span className="text-gray-700 text-sm">{fileName}</span>
              <button
                onClick={resetFile}
                className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {parseError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 font-semibold mb-1">File Parsing Error</p>
            <p className="text-red-600 text-sm">{parseError}</p>
          </div>
        )}
      </div>


      {/* Improved table UI */}
      {accountsData.length > 0 && (
        <div className="mb-8 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Account Data Preview</h3>
            <span className="text-sm text-gray-500">
              {accountsData.length} account{accountsData.length !== 1 ? 's' : ''} found
              {Object.keys(validationErrors).length > 0 && `, ${Object.keys(validationErrors).length} errors`}
            </span>
          </div>
          
          <div className="overflow-x-auto border rounded-lg py-2 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">
                    Password
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-50 z-10">
                    Status
                  </th>
                </tr>
              </thead>
              {/* Keep existing tbody content */}
              <tbody className="bg-white divide-y divide-gray-200">
                {accountsData.slice(0, 10).map((account, index) => (
                  <tr key={index} className={validationErrors[index] ? "bg-red-50" : ""}>
                    <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words text-sm font-medium text-gray-900">
                      {account.email}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-500">
                      {account.password ? '••••••••••••' : 'Missing'}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-500">
                      {account.name || 'Missing'}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {validationErrors[index] ? (
                        <div className="text-xs text-red-600">
                          {validationErrors[index].map((err, i) => (
                            <div key={i}>• {err}</div>
                          ))}
                        </div>
                      ) : processingStatus[index] ? (
                        <div className={`text-sm flex items-center ${
                          processingStatus[index].status === 'success' ? 'text-green-600' :
                          processingStatus[index].status === 'error' ? 'text-red-600' :
                          processingStatus[index].status === 'processing' ? 'text-blue-600' :
                          'text-gray-500'
                        }`}>
                          {processingStatus[index].status === 'processing' && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          )}
                          {processingStatus[index].status === 'success' && (
                            <svg className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {processingStatus[index].status === 'error' && (
                            <svg className="h-4 w-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                          {processingStatus[index].message}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
                {accountsData.length > 10 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">
                      {accountsData.length - 10} more account{accountsData.length - 10 !== 1 ? 's' : ''} not shown
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Updated processing controls */}
      {accountsData.length > 0 && (
        <div className="mt-6">
          {isProcessing && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-700">Processing Progress</h4>
                <span className="text-sm text-gray-500">{overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* <div className="flex justify-end space-x-3">
            <button
              onClick={resetFile}
              disabled={isProcessing}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={processAccounts}
              disabled={isProcessing || Object.keys(validationErrors).length > 0 || !referralLink}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Process All Accounts'
              )}
            </button>
          </div> */}
              <div className="flex justify-end space-x-3">
      {/* Cancel Button - red theme */}
      <button
        onClick={resetFile}
        disabled={isProcessing}
        className="px-4 py-2 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 disabled:opacity-50"
      >
        Cancel
      </button>
      {/* Process All Accounts - green theme */}
      <button
        onClick={processAccounts}
        disabled={isProcessing || Object.keys(validationErrors).length > 0 || !selectedReferralId}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Process All Accounts'
        )}
      </button>
    </div>
        </div>
      )}
    </div>
  )
}