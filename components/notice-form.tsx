"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import type { NoticeFormData, Notice } from "@/types/notice"
import { useToast } from "@/hooks/use-toast"

interface NoticeFormProps {
  onSubmit: (data: NoticeFormData) => Promise<void>
  initialData?: Notice
  isEditing?: boolean
  onCancel?: () => void
}

export function NoticeForm({ onSubmit, initialData, isEditing = false, onCancel }: NoticeFormProps) {
  const [formData, setFormData] = useState<NoticeFormData>({
    serial: initialData?.serial || "",
    headline: initialData?.headline || "",
    description: initialData?.description || "",
    date: initialData?.date || new Date().toLocaleDateString("bn-BD"),
    downloadLink: initialData?.downloadLink || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSubmit(formData)
      if (!isEditing) {
        setFormData({
          serial: "",
          headline: "",
          description: "",
          date: new Date().toLocaleDateString("bn-BD"),
          downloadLink: "",
        })
      }
      toast({
        title: isEditing ? "নোটিশ আপডেট হয়েছে" : "নোটিশ যোগ হয়েছে",
        description: "সফলভাবে সম্পন্ন হয়েছে",
      })
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "নোটিশ সেভ করতে সমস্যা হয়েছে",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ যোগ করুন"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serial">সিরিয়াল নম্বর</Label>
              <Input
                id="serial"
                value={formData.serial}
                onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                placeholder="যেমন: ১, ২, ৩"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">তারিখ</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="যেমন: ১২ আগস্ট ২০২৫"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">নোটিশের শিরোনাম</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              placeholder="নোটিশের শিরোনাম লিখুন"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">বিবরণ</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="নোটিশের বিস্তারিত বিবরণ লিখুন"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downloadLink">গুগল ড্রাইভ লিংক</Label>
            <Input
              id="downloadLink"
              type="url"
              value={formData.downloadLink}
              onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
              placeholder="https://drive.google.com/..."
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "সেভ হচ্ছে..." : isEditing ? "আপডেট করুন" : "যোগ করুন"}
            </Button>
            {isEditing && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                বাতিল
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
