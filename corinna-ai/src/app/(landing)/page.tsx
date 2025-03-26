import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { FlipText } from "@/components/magicui/flip-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { MaxWidthWrapper } from "@/components/max-widht-wrapeer";
import Navbar from "@/components/navbar";
import ShinyButton from "@/components/shiny-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PRICING_CARDS } from "@/constants/landing-page-pricing-cards";
import clsx from "clsx";
import { Check, Grid } from "lucide-react";
import { section } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { features } from "process";

const Page = () => {
    // wip: linking of get started buttons in pricing sections pricing 
    // wip: images in bento Grid
    // wip: contact us section
    // wip: footer
  return (
    <div>
      <MaxWidthWrapper>
        {/* navbar  */}
        <Navbar></Navbar>
        {/* hero section  */}
        <section>
          <div className="flex items-center justify-center flex-col mt-[80px] gap-2">
            <span className="rounded-full border bg-purple-500/20 text-purple-400 px-4 py-2">
              <AnimatedGradientText>
                {" "}
                An AI Powered Sales Assistant Chatbot{" "}
              </AnimatedGradientText>{" "}
            </span>
            <div className="text-5xl md:text-6xl lg:text-8xl font-bold m-5 items-center tracking-tighter text-pretty "
          >
            <FlipText
              duration={1.0}
                >
              CORINNA AI
            </FlipText>
            </div>
            <TextAnimate animation="blurIn" duration={1.0} as="h1" className="text-center text-lg text-pretty max-w-[500px]">
                Your AI powered sales assistant! Embed Corinna AI into any website with just a snippet of code!
            </TextAnimate>
            <Image src={"/demo.png"} alt="demo image" width={400} height={100}></Image>
            <div className="mt-5">
            <ShinyButton href="/sign-up">Get Started For Free</ShinyButton>
            </div>
            
          </div>
        </section>
         {/* features bento grid  */}
         <section className="mt-10 z-0">
        <MaxWidthWrapper>
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              {" "}
              💡 Smarter Conversations
            </h2>
            <h1 className="text-center m-3">Engage visitors with AI that understands and responds intelligently.</h1>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 auto-rows-auto lg:grid-cols-3 lg:grid-rows-2">
            {/* first bento grid element  */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                  AI-Powered 24/7 Sales Rep: Smart, Personalized, Efficient!
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    {" "}
                    ✨Train your AI bot to respond just like you! It learns from FAQs, business insights, and information to match your brand’s voice.  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute bg-gray-900 border-gray-700 inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] shadow-2xl">
                    <Image
                      src={"/phone-screen.png"}
                      alt="phone screen dispaying app interface"
                      className="object-top object-cover size-full"
                      fill
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="absolute pointer-events-none shadow ring-1 rounded-lg ring-black/5 lg:rounded-l-[2rem] inset-px" />
            </div>
            {/* second bento grid element  */}
            <div className="relative max-lg:row-start-1 ">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                  AI-Powered Email Marketing
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  📨 Send targeted emails to your leads with one click!
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  🚀 Choose your leads, craft a message, and hit send.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src={"/bento-any-event.png"}
                    alt="bento box illustrating event tracking"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="pointer-events-none shadow ring-1 absolute rounded-lg ring-black/5 lg:rounded-t-[2rem] inset-px "></div>
            </div>
            {/* third bento grid element  */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="sm:pt-10 sm:px-10 pt-8 px-8">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                  Smart Lead Collection
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  📧 Capture more leads with every chat!
                  Your AI bot automatically collects emails from visitors and stores them for you.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    src={"/bento-custom-data.png"}
                    alt="Bento box illustrating custom data tracking"
                    className="w-full max-lg:max-w-xs"
                    width={500}
                    height={300}
                  ></Image>
                </div>
              </div>
              <div className="absolute shadow ring-1 ring-black/5 pointer-events-none rounded-lg inset-px  " />
            </div>
            {/* fourth bento grid element  */}
            <div className="relative lg:row-span-2">
              <div className="absolute bg-white rounded-lg inset-px max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Easy Integration
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  💻 Seamlessly integrate your AI chatbot with a single line of code. Just copy, paste, and you're ready to go!
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400 ">
                        <div className="border-b border-r border-b-white/20 border-r-white/20 bg-gray-800 px-4 py-2 text-white">
                          pingpanda.js
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="max-h-[30rem]">
                        {/* <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow pointer-events-none ring-1 ring-black/5 rounded-lg absolute inset-px max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
        {/* pricing section  */}
        <section className="flex justify-center items-center flex-col gap-4 mt-10">
            <h2 className="text-4xl text-center">Choose what fits you right</h2>
            <p className="text-muted-foreground text-center max-w-lg">
                Our straightforward pricing plans are tailored to meet your needs. If {"you're"} not ready to commit you can start for free.
            </p>
        </section>
        {/* pricing cards  */}
        <div className="flex justify-center gap-4 flex-wrap mt-6">
            {PRICING_CARDS.map((card)=>(
                <Card key={card.title} className={clsx('hover:scale-105 overflow-hidden transition-transform duration-300 ease-in-out hover:z-50 hover:cursor-pointer hover:brightness-110 w-[300px] flex flex-col justify-between',{'border-2 border-primary -translate-y-3 ':card.title==='Unlimited'})}>
                    <CardHeader>
                        <CardTitle className="text-purple">{card.title}</CardTitle>
                        <CardDescription>
                            {PRICING_CARDS.find((c)=>c.title===card.title)?.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <span className="text-4xl font-bold">{card.price}</span>
                        <span className="text-muted-foreground"><span>/ month</span></span>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                       <div>
                        {card.features.map((feature)=>(
                            <div className="flex gap-2" key={feature}>
                                <Check />
                                <p>{feature}</p>
                            </div>
                        ))}
                       </div>
                       <Link href={"/"} className="bg-purple-400 border-purple-800 p-2 w-full text-center font-bold rounded-md">Get Started</Link>
                    </CardFooter>
                </Card>
            ))}

        </div>
        {/* contact us  */}
        <section></section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
