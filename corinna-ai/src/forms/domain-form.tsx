"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UploadClient } from "@uploadcare/upload-client"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next'
import '@uploadcare/react-uploader/core.css'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { domainSchema } from "@/lib/zodSchema"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { onIntegerateDomain } from "@/app/actions/onIntegrateDomain"
import { toast } from "sonner"

const uploadClient = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
})


const DomainForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const domainForm = useForm<z.infer<typeof domainSchema>>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
      icon: "",
    },
  })

  async function onSubmit(values: z.infer<typeof domainSchema>) {
    setLoading(true)

    if (!values.icon) {
      toast("Error", { description: "Please upload an icon before submitting." })
      setLoading(false)
      return
    }

    try {
      const uploadImage = await uploadClient.uploadFile(values.icon)
      const addDomain = await onIntegerateDomain(values.domain, uploadImage.uuid)

      if (addDomain) {
        setLoading(false)
        toast(addDomain.status === 200 ? "Success" : "Error", {
          description: addDomain.message,
        })
        router.refresh()
      }
    } catch (error) {
      toast("Error", { description: "File upload failed." })
      setLoading(false)
    }
  }

  return (
    <Form {...domainForm}>
      <form onSubmit={domainForm.handleSubmit(onSubmit)} className="">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Add your business domain
        </h1>
        <p className="text-sm font-extralight text-center text-gray-200/40">
          Add in your domain address to integrate your chatbot.
        </p>

        {/* Domain Input */}
        <FormField
          control={domainForm.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="p-4">
              <FormLabel className="mb-0">Domain Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="mydomain.com"
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload Icon */}
        <FormField
          control={domainForm.control}
          name="icon"
          render={({ field }) => (
            <FormItem className="px-4">
              <FormLabel>Upload Icon</FormLabel>
              <FormControl>
                <FileUploaderRegular
                  sourceList="local, camera, gdrive"
                  cameraModes="photo"
                  classNameUploader="uc-light"
                  pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string}
                  onChange={(output) => {
                    if (output.successEntries.length > 0) {
                      field.onChange(output.successEntries[0].uuid)
                    }
                  }}
                />
              </FormControl>
              <p className="text-xs text-gray-500">
                Recommended size is 300px × 300px, size less than 2MB
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full p-2 text-white bg-gray-900 rounded-lg hover:bg-gray-700 mt-5"
        >
          {loading ? "Uploading..." : "Add Domain"}
        </Button>
      </form>
    </Form>
  )
}
export default DomainForm
