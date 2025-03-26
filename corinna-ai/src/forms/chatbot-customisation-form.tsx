"use client";

import { chatBotCustomisationSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "@uploadcare/react-uploader/core.css";
import { UploadClient } from "@uploadcare/upload-client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { customiseChatbot } from "@/app/actions/customiseChatbot";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePlan } from "@/context/Plan-Context";

const uploadClient = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

const ChatBotCustomisationForm = ({ domainId }: { domainId: string }) => {
  const { plan } = usePlan()
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isDisabled = plan === "STANDARD";

  const chatbotCustomisation = useForm<
    z.infer<typeof chatBotCustomisationSchema>
  >({
    resolver: zodResolver(chatBotCustomisationSchema),
    defaultValues: {
      icon: process.env.DEFAULT_CHATBOT_ICON_UUID,
      welcomeMessage: "Hey there! Have Questions? Text us here.",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof chatBotCustomisationSchema>
  ) => {
    setLoading(true);
    try {
      let iconUuid = values.icon; // Default UUID from form

      // If the user hasn't uploaded a new icon, use the default UUID from env
      if (!iconUuid) {
        iconUuid = process.env.NEXT_PUBLIC_DEFAULT_CHATBOT_ICON_UUID || "";
      } else if (!iconUuid.startsWith("http")) {
        // If the user uploaded a new file, upload it and get the new UUID
        const uploadImage = await uploadClient.uploadFile(iconUuid);
        iconUuid = uploadImage.uuid;
      }

      // Send request with final icon UUID
      const response = await customiseChatbot(
        domainId,
        values.welcomeMessage || "Hey there! Have Questions? Text us here.",
        iconUuid
      );

      if (response) {
        toast(response.status === 200 ? "Success" : "Error", {
          description: response.message,
        });
        router.refresh();
      }
    } catch (error) {
      toast("Error", { description: "File upload failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...chatbotCustomisation}>
      <form onSubmit={chatbotCustomisation.handleSubmit(onSubmit)}>
        {/* add icon  */}
        <FormField
          name="icon"
          control={chatbotCustomisation.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Change Icon</FormLabel>
              <FormControl>
                {isDisabled?<div className="flex flex-col">
                   <Link href={"/settings"}><Button>Upgrade</Button></Link> 
                  <span className="border rounded-md bg-gray-100/40 text-xs p-1 mt-2 border-none font-extralight text-gray-200">Upgrade your plan and customise image of your chatbot.</span>  
                </div>:<div>
                <FileUploaderRegular
                  sourceList="local, camera, gdrive"
                  cameraModes="photo"
                  classNameUploader="uc-light"
                  pubkey={
                    process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
                  }
                  onChange={(output) => {
                    if (output.successEntries.length > 0) {
                      field.onChange(output.successEntries[0].uuid);
                    }
                  }}
                  
                />
                <p className="text-xs text-gray-500">
                Recommended size is 300px × 300px, size less than 2MB
              </p>
              </div>
                }
                
              </FormControl>
              
            </FormItem>
          )}
        />

        {/* welcome message  */}
        <FormField
        disabled={isDisabled}
          control={chatbotCustomisation.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customise Welcome Message</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hey there! Need help? Text us here."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* submit button  */}
        <Button
          type="submit"
          disabled={loading||isDisabled}
          className="w-full p-2 text-white bg-gray-900 rounded-lg hover:bg-gray-700 mt-5"
        >
          {loading ? "Customising..." : "Customise"}
        </Button>
      </form>
    </Form>
  );
};

export default ChatBotCustomisationForm;
