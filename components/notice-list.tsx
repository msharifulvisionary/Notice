"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Notice, NoticeFormData } from "@/types/notice"
import { NoticeForm } from "./notice-form"
import { Pencil, Trash2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NoticeListProps {
  notices: Notice[]
  onUpdate: (id: string, data: NoticeFormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function NoticeList({ notices, onUpdate, onDelete }: NoticeListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string, headline: string) => {
    if (confirm(`"${headline}" নোটিশটি মুছে ফেলতে চান?`)) {
      try {
        await onDelete(id)
        toast({
          title: "নোটিশ মুছে ফেলা হয়েছে",
          description: "সফলভাবে সম্পন্ন হয়েছে",
        })
      } catch (error) {
        toast({
          title: "ত্রুটি",
          description: "নোটিশ মুছতে সমস্যা হয়েছে",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpdate = async (data: NoticeFormData) => {
    if (editingId) {
      await onUpdate(editingId, data)
      setEditingId(null)
    }
  }

  if (notices.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">কোন নোটিশ পাওয়া যায়নি</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {notices.map((notice) => (
        <Card key={notice.id}>
          {editingId === notice.id ? (
            <NoticeForm
              onSubmit={handleUpdate}
              initialData={notice}
              isEditing={true}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {notice.serial}
                    </Badge>
                    <CardTitle className="text-lg">{notice.headline}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingId(notice.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(notice.id, notice.headline)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{notice.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">📅 {notice.date}</span>
                  <Button size="sm" asChild>
                    <a href={notice.downloadLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      ডাউনলোড
                    </a>
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </div>
  )
}
