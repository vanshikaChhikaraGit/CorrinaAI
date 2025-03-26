import { helpDeskQuesSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import onUploadHelpDeskQuestionsAnswers from "@/app/actions/onUploadHelpDeskQuesAns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
    domainId: string;
    setHelpDeskQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  };
  
  const HelpDeskForm = ({ domainId, setHelpDeskQuestions }: Props) => {
    const [loading, setLoading] = useState(false);
    const helpDeskForm = useForm<z.infer<typeof helpDeskQuesSchema>>({
      resolver: zodResolver(helpDeskQuesSchema),
      defaultValues: {
        question: "",
        answer: "",
      },
    });
  
    async function onSubmit(values: z.infer<typeof helpDeskQuesSchema>) {
      setLoading(true);
      try {
        const response = await onUploadHelpDeskQuestionsAnswers(domainId, values.question, values.answer);
        if (response) {
          toast(response.status === 200 ? "Success" : "Error", { description: response.message });
  
          setHelpDeskQuestions((prev) => [...prev, { question: values.question, answer: values.answer }]);
  
          setLoading(false);
        }
      } catch (error) {
        toast("Error", { description: "An error occurred." });
        setLoading(false);
      }
    }
  
    return (
      <Form {...helpDeskForm}>
        <form onSubmit={helpDeskForm.handleSubmit(onSubmit)}>
          <FormField
            name="question"
            control={helpDeskForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <p>Add a frequently asked question.</p>
                <FormControl>
                  <Input {...field} placeholder="Type your question" />
                </FormControl>
              </FormItem>
            )}
          />
  
          <FormField
            name="answer"
            control={helpDeskForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <p>Answer for the question</p>
                <FormControl>
                  <Input {...field} placeholder="Type your answer" />
                </FormControl>
              </FormItem>
            )}
          />
  
          <Button type="submit" disabled={loading} className="w-full p-2 hover:bg-gray-700 mt-5">
            {loading ? "Uploading..." : "Add Question"}
          </Button>
        </form>
      </Form>
    );
  };
  
  export default HelpDeskForm;