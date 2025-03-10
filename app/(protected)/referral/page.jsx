'use client';

import { useEffect, useState } from 'react';
import { Loader2, Trash2, ExternalLink, Link2, Copy, Check } from 'lucide-react';
import credentials from '../../../config/credentials';
import Link from "next/link";

export default function ReferralLinks() {
  const [referrals, setReferrals] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch('/api/referral',{
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY
          },
        });
        const data = await res.json();
        if (data.status === 'success') {
          const groupedReferrals = data.referrals.reduce((acc, referral) => {
            if (!acc[referral.service]) {
              acc[referral.service] = [];
            }
            acc[referral.service].push(referral);
            return acc;
          }, {});
          setReferrals(groupedReferrals);
        }
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this referral link?')) return;

    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/referral/${id}`, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY
        },
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.status === 'success') {
        setReferrals((prev) => {
          const newReferrals = { ...prev };
          for (const service in newReferrals) {
            newReferrals[service] = newReferrals[service].filter(
              (r) => r.id !== id
            );
            if (newReferrals[service].length === 0) {
              delete newReferrals[service];
            }
          }
          return newReferrals;
        });
      }
    } catch (error) {
      console.error('Error deleting referral:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-2 sm:p-4 max-w-6xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-white">
            <Link2 className="h-5 w-5 sm:h-6 sm:w-6" />
            Your Referral Links
          </h2>
          <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
            Share these links with friends and earn rewards
          </p>
        </div>

        {Object.keys(referrals).length === 0 ? (
          <div className="p-4 sm:p-8 text-center">
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 inline-block">
              <Link2 className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                You don&apos;t have any referral links yet.
              </p>
              <Link to="/dashboard/create-referral">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition text-sm sm:text-base">
                Create Your First Link
              </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-4 md:p-6">
            {Object.entries(referrals).map(([service, links]) => (
              <div key={service} className="mb-6 last:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  {service}
                  <span className="ml-2 text-xs sm:text-sm font-normal text-gray-500">
                    ({links.length} {links.length === 1 ? 'link' : 'links'})
                  </span>
                </h3>

                <div className="space-y-3">
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm">
                          <th className="p-3 text-left">Service</th>
                          <th className="p-3 text-left">Referral Code</th>
                          <th className="p-3 text-left">Referral Link</th>
                          <th className="p-3 text-left">Created</th>
                          <th className="p-3 text-center">Sign Ups</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {links.map((referral) => (
                          <tr
                            key={referral.id}
                            className="border-t border-gray-200 hover:bg-gray-50 transition"
                          >
                            <td className="p-3 font-medium text-gray-800">{referral.service}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                                  {referral.code}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(referral.code, `code-${referral.id}`)}
                                  className="text-gray-500 hover:text-blue-600"
                                  title="Copy code"
                                >
                                  {copiedId === `code-${referral.id}` ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="max-w-[200px] truncate text-blue-600">
                                  {credentials.domain + referral.url}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(credentials.domain + referral.url, `link-${referral.id}`)}
                                  className="text-gray-500 hover:text-blue-600"
                                  title="Copy link"
                                >
                                  {copiedId === `link-${referral.id}` ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </button>
                                <a
                                  href={credentials.domain + referral.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Open link"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </div>
                            </td>
                            <td className="p-3 text-gray-600 text-sm">
                              {new Date(referral.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-center">
                              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium rounded-full px-3 py-1">
                                {referral.signups}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                className="inline-flex items-center justify-center p-2 rounded-full text-red-500 hover:bg-red-50 transition"
                                onClick={() => handleDelete(referral.id)}
                                disabled={deleteLoading === referral.id}
                                title="Delete referral"
                              >
                                {deleteLoading === referral.id ? (
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-5 w-5" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards - FIXED */}
                  <div className="md:hidden space-y-3">
                    {links.map((referral) => (
                      <div
                        key={referral.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                      >
                        {/* Header with service name + actions */}
                        <div className="p-3 flex justify-between items-center border-b border-gray-100">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-gray-800 text-sm truncate">
                              {referral.service}
                            </h4>
                            <span className="text-xs text-gray-500 block mt-0.5">
                              {new Date(referral.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">
                              {referral.signups}
                            </span>
                            <button
                              className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                              onClick={() => handleDelete(referral.id)}
                              disabled={deleteLoading === referral.id}
                            >
                              {deleteLoading === referral.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Code section */}
                        <div className="p-3 border-b border-gray-100">
                          <div className="text-xs font-medium text-gray-600 mb-1">Code</div>
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-50 rounded py-1 px-2 text-xs font-mono flex-1 truncate">
                              {referral.code}
                            </div>
                            <button
                              onClick={() => copyToClipboard(referral.code, `mobile-code-${referral.id}`)}
                              className="shrink-0 p-1 text-gray-500 hover:text-blue-600"
                            >
                              {copiedId === `mobile-code-${referral.id}` ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Link section */}
                        <div className="p-3">
                          <div className="text-xs font-medium text-gray-600 mb-1">Link</div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-blue-600 flex-1 truncate">
                              {credentials.domain + referral.url}
                            </div>
                            <div className="flex shrink-0 gap-1">
                              <button
                                onClick={() => copyToClipboard(credentials.domain + referral.url, `mobile-link-${referral.id}`)}
                                className="p-1 text-gray-500 hover:text-blue-600"
                              >
                                {copiedId === `mobile-link-${referral.id}` ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </button>
                              <a
                                href={credentials.domain + referral.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-blue-600"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}