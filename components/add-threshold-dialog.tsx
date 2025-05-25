"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface AddThresholdDialogProps {
  onAddThreshold: (name: string, value: number) => void
}

export function AddThresholdDialog({ onAddThreshold }: AddThresholdDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && value.trim()) {
      const numValue = Number.parseFloat(value)
      if (!isNaN(numValue)) {
        onAddThreshold(name.trim(), numValue)
        setName("")
        setValue("")
        setOpen(false)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Threshold
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Threshold</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="threshold-name">Threshold Name</Label>
            <Input
              id="threshold-name"
              placeholder="e.g., Critical, Warning"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="threshold-value">Value</Label>
            <Input
              id="threshold-value"
              type="number"
              placeholder="e.g., 150000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Threshold</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
