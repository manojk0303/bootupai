// components/bulk-services/PipedreamBulkUpload.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  const [referralLink, setReferralLink] = useState('')
  const [referralError, setReferralError] = useState('')
  const fileInputRef = useRef(null)
  const router = useRouter()

  // Building purpose options
  const buildingOptions = [
    "Automating internal processes",
    "AI agents",
    "Workflows for my clients",
    "Integrations for my app"
  ]

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
            const requiredHeaders = ['email', 'password', 'buildingPurpose']
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
            const requiredFields = ['email', 'password', 'buildingPurpose']
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
            if (account.password.length < 12) passwordErrors.push('min 12 chars')
            if (!/[A-Z]/.test(account.password)) passwordErrors.push('uppercase')
            if (!/[a-z]/.test(account.password)) passwordErrors.push('lowercase')
            if (!/[0-9]/.test(account.password)) passwordErrors.push('number')
            if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(account.password)) passwordErrors.push('special char')
            
            if (passwordErrors.length > 0) {
              accountErrors.push(`Password missing: ${passwordErrors.join(', ')}`)
            }
          }
          
          // Building purpose validation
          if (!account.buildingPurpose || !buildingOptions.includes(account.buildingPurpose)) {
            accountErrors.push('Invalid building purpose')
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

    // Extract slug from referral link input
    const slugPart = referralLink.split('/r/')
    let slug = ''
    if (slugPart.length >= 2) {
      slug = slugPart[1].split('/')[0] // Get the slug part after /r/
    } else {
      setReferralError('Invalid referral link format. Please include the full referral URL.')
      return
    }

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
          const response = await fetch('/api/create-account', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY
            },
            body: JSON.stringify({ 
              email: accountsData[i].email, 
              password: accountsData[i].password, 
              buildingPurpose: accountsData[i].buildingPurpose,
              slug: slug,
              service: 'pipedream'
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
    const fileName = `pipedream_template.${format}`
    let fileContent = ''
    let fileType = ''
    
    if (format === 'csv') {
      fileContent = 'email,password,buildingPurpose\n'
      fileContent += 'user1@example.com,SecurePassword1!,Automating internal processes\n'
      fileContent += 'user2@example.com,AnotherSecure2@,AI agents'
      fileType = 'text/csv'
    } else if (format === 'json') {
      const sampleData = [
        {
          email: 'user1@example.com',
          password: 'SecurePassword1!',
          buildingPurpose: 'Automating internal processes'
        },
        {
          email: 'user2@example.com',
          password: 'AnotherSecure2@',
          buildingPurpose: 'AI agents'
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
    <div className="px-4 py-5 sm:p-6">
      {/* Referral link input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Referral Link
        </label>
        <div className="mt-1">
          <input
            type="url"
            value={referralLink}
            onChange={(e) => {
              setReferralLink(e.target.value)
              setReferralError('')
            }}
            placeholder="Paste full referral link (e.g., https://example.com/r/pipedream123)"
            className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300"
          />
        </div>
        {referralError && (
          <p className="mt-2 text-sm text-red-600">{referralError}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          This should be the full referral URL provided to you
        </p>
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
                    Purpose
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
                      {account.buildingPurpose || 'Missing'}
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
        disabled={isProcessing || Object.keys(validationErrors).length > 0 || !referralLink}
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