
import DelegateTable from '@/components/custom/delegatetable'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
    <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
      <Link
          href="../admin"
          className="text-lg font-bold mx-auto sm:mx-0"
        >
          Admin Panel- VITMUN 25
        </Link>
      <div className="hidden sm:flex space-x-4">
        <Link
          href="../admin"
          className="px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  </nav>

  {/* Content Section */}
  <div id="top" className="p-6 mt-16 bg-gray-100 rounded-lg shadow-md">
    <ul className="list-disc pl-8 space-y-2 text-gray-700">
      <li>
        Use <span className="font-semibold">Ctrl+F</span> or <span className="font-semibold">Cmd+F</span> to search for delegates.
      </li>
      <li>
        <span className="font-semibold text-red-600">DO NOT FORGET</span> to save your changes.
      </li>
      <li>
        <span className="font-semibold text-red-600">Confidential:</span> This page is extremely confidential and should only be accessed by the Core Secretariat and USG-Delegate Affairs and USG-Hospitality.
      </li>
    </ul>
  </div>

    <DelegateTable/>
    </>
  )
}

export default page
