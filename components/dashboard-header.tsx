"use client"

import { Button } from "@/components/ui/button"
import { removeAuthToken } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { LogOut, Eye } from "lucide-react"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    removeAuthToken()
    router.push("/")
  }

  const handleViewNotices = () => {
    router.push("/notices")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-900">নোটিশ ম্যানেজমেন্ট ড্যাশবোর্ড</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleViewNotices}>
              <Eye className="h-4 w-4 mr-2" />
              নোটিশ দেখুন
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              লগআউট
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
