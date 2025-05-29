"use client"

import  React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DashboardHeader } from "../../../../components/dashboard-header"

export default function BannerPage() {
    const [imagePreview, setImagePreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            // Create a URL for the file preview
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Update Banner</h2>
                </div>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="banner-image">Banner Image</Label>
                        <Input id="banner-image" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {imagePreview && (
                        <div className="space-y-2">
                            <Label>Preview</Label>
                            <div className="relative w-full h-48 overflow-hidden border border-gray-200 rounded-md">
                                <Image
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Banner preview"
                                    fill
                                    style={{ objectFit: "contain" }}
                                    className="bg-gray-50"
                                />
                            </div>
                            <p className="text-sm text-gray-500">
                                {selectedFile?.name} ({Math.round(selectedFile?.size / 1024)} KB)
                            </p>
                        </div>
                    )}

                    <Button type="submit">Update Image</Button>
                </form>
            </div>
        </div>
    )
}
