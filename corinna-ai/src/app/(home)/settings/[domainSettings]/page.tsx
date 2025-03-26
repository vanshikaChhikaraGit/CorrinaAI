"use client";

import { Heading } from "@/components/Heading";
import { MaxWidthWrapper } from "@/components/max-widht-wrapeer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { code_snippet } from "@/constants/code-snippet";
import { useDomain } from "@/context/Domain-Context";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ChangeChatbotIcon from "@/components/Change-Chatbot-Icon";
import HelpDesk from "@/components/HelpDesk";

type HelpDeskQuestion = {
  question: string;
  answer: string;
};

const Page = () => {
  // wip:- filter ques forum left 
  const [helpDeskQuestions, setHelpDeskQuestions] = useState<HelpDeskQuestion[]>([]);
  const [copy, setCopy] = useState(false);
  const { domainSettings } = useParams();
  const { domains } = useDomain();
  const domain = domains?.find((domain) => domain.name === domainSettings);
  const domainId = domain?.id ?? "saas-platform-domain-key-9876543210";

  const codeSnippet = code_snippet(domainId);

  const handleCopy = async () => {
    try {
      const copidText = await navigator.clipboard.writeText(codeSnippet);
      console.log(copidText);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch (error) {}
  };

  return (
    <div>
      <MaxWidthWrapper className="px-4 sm:px-6 md:px-8 ">
        <Heading className="mt-5">Domain Settings</Heading>
        <Separator className="m-3 "></Separator>
        {/* current domain name */}
        <Card className="mb-5 w-full max-w-[95vw] overflow-hidden">
          <CardHeader>
            <CardTitle>Domain Name</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant={"outline"} className=""> {domainSettings}</Button>
          </CardContent>
        </Card>

        {/* code snippet for websites to add in thier saas  */}
        <section className="">
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Code Snippet</CardTitle>
              <CardDescription>
                Copy and Paste this code into the header tag of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant={"outline"} onClick={handleCopy}>
                {copy ? "Copied!" : "Copy"}
              </Button>
              <SyntaxHighlighter language="javascript" style={atomDark} className="w-full max-w-full overflow-x-auto">
                {codeSnippet}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </section>

        {/* chat bot settings  */}
        <section>
          <Card className="mb-5">
            <CardHeader>
            <CardTitle className="flex">
              <p className="flex items-center justify-center ml-1">ChatBot Settings</p>
              <div className="group relative flex items-center justify-center rounded-full px-2 py-1.5 ml-1 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      👑 <hr className="mx-1 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">
        Premium
      </AnimatedGradientText>
    </div>
              </CardTitle>
              </CardHeader>
              <CardContent>
              <ChangeChatbotIcon domainId={domainId}></ChangeChatbotIcon>
              </CardContent>
          </Card>
        </section>

        {/* chatbot training forum  */}
        <section>
          {/* help desk form users add the faqs regarding their saas and we store them in db and also show thrm on scree */}
          <HelpDesk 
        domainId={domainId} 
        helpDeskQuestions={helpDeskQuestions} 
        setHelpDeskQuestions={setHelpDeskQuestions} 
      />
          {/* users provide filter question used for training the bot */}
          {/* <FilterQuestions></FilterQuestions> */}
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
