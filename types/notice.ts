// Notice type definitions
export interface Notice {
  id: string
  serial: string
  headline: string
  description: string
  date: string
  downloadLink: string
  createdAt: Date
  updatedAt: Date
}

export interface NoticeFormData {
  serial: string
  headline: string
  description: string
  date: string
  downloadLink: string
}
