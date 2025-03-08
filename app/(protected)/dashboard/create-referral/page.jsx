// dashboard/create-referral/page/
'use client';

import { useState } from 'react';
import { Copy, Link2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ReferralPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [referralUrl, setReferralUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    const service = formData.get('service');
    const code = formData.get('code');

    try {
      const response = await fetch('/api/create-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_FRONTEND_API_KEY
        },
        body: JSON.stringify({ service, code }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const fullUrl = `${window.location.origin}${data.url}`;
        setReferralUrl(fullUrl);
        setError(null);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to create referral link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Link2 className="h-6 w-6 text-primary" />
            Create Referral Link
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Generate a custom referral link for your preferred service
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service">Select Service</Label>
              <Select name="service" disabled={isLoading} defaultValue="PIPEDREAM">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PIPEDREAM">Pipedream</SelectItem>
                  <SelectItem value="AIRTABLE">Airtable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Referral Code</Label>
              <Input
                id="code"
                name="code"
                placeholder="Enter your referral code"
                disabled={isLoading}
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Link'
              )}
            </Button>
          </form>

          {referralUrl && (
            <div className="mt-8 space-y-2">
              <Label>Your Referral Link</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={referralUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copySuccess && (
                <p className="text-sm text-green-600">
                  ✓ Link copied to clipboard
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Share this link with others to start earning referral rewards
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}