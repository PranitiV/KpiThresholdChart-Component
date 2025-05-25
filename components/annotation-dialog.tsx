"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AnnotationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  month: string
  value: number
  onAddAnnotation: (month: string, note: string, value: number) => void
}

export function AnnotationDialog({ open, onOpenChange, month, value, onAddAnnotation }: AnnotationDialogProps) {
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (note.trim()) {
      onAddAnnotation(month, note.trim(), value)
      setNote("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Annotation for {month}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="annotation-value">Value</Label>
            <Input id="annotation-value" value={value.toLocaleString()} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annotation-note">Note</Label>
            <Textarea
              id="annotation-note"
              placeholder="Add your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Annotation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
