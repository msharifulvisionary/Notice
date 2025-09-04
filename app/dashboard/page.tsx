"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { NoticeForm } from "@/components/notice-form"
import { NoticeList } from "@/components/notice-list"
import type { Notice, NoticeFormData } from "@/types/notice"
import { addNotice, getNotices, updateNotice, deleteNotice } from "@/lib/notices"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/")
      return
    }

    loadNotices()
  }, [router])

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

  const handleAddNotice = async (data: NoticeFormData) => {
    await addNotice(data)
    await loadNotices()
  }

  const handleUpdateNotice = async (id: string, data: NoticeFormData) => {
    await updateNotice(id, data)
    await loadNotices()
  }

  const handleDeleteNotice = async (id: string) => {
    await deleteNotice(id)
    await loadNotices()
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <NoticeForm onSubmit={handleAddNotice} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">সকল নোটিশ</h2>
            {isLoading ? (
              <div className="text-center py-8">লোড হচ্ছে...</div>
            ) : (
              <NoticeList notices={notices} onUpdate={handleUpdateNotice} onDelete={handleDeleteNotice} />
            )}
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}
