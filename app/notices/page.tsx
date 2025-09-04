"use client"

import { useEffect, useState } from "react"
import type { Notice } from "@/types/notice"
import { getNotices } from "@/lib/notices"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadNotices()
  }, [])

  const loadNotices = async () => {
    try {
      const noticesData = await getNotices()
      setNotices(noticesData)
    } catch (error) {
      console.error("Error loading notices:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (notice: Notice) => {
    const confirmed = confirm(`"${notice.headline}" ডাউনলোড করতে চান?`)
    if (confirmed) {
      window.open(notice.downloadLink, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            ফিরে যান
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-2">📢 নোটিশ বোর্ড</h1>
            <p className="text-blue-100">সর্বশেষ আপডেট ও গুরুত্বপূর্ণ তথ্য</p>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">লোড হচ্ছে...</p>
              </div>
            ) : notices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">কোন নোটিশ পাওয়া যায়নি</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                        {notice.serial}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.headline}</h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{notice.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">📅 {notice.date}</span>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(notice)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        ডাউনলোড
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
