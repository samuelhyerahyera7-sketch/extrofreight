'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/internal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next: params.get('next') }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(true)
        return
      }
      router.push(data.next)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
      <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-5">
        <Lock className="w-5 h-5" />
      </div>
      <h1 className="text-xl font-bold text-navy-900 mb-1">Staff access</h1>
      <p className="text-sm text-gray-500 mb-6">Enter the internal password to continue.</p>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      {error && <p className="text-sm text-red-600 mb-4">Incorrect password. Try again.</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Checking…' : 'Continue'}
      </Button>
    </form>
  )
}

export default function InternalLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
