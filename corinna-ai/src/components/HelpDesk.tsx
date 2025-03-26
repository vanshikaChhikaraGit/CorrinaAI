import React, { useEffect, useState } from 'react'
import { MaxWidthWrapper } from './max-widht-wrapeer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import HelpDeskForm from '@/forms/helpdesk-form'
import { getHelpDeskQues } from '@/app/actions/getHelpDeskQus'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

type Props = {
    domainId: string;
    helpDeskQuestions: any[];
    setHelpDeskQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  };
  
  const HelpDesk = ({ domainId, helpDeskQuestions, setHelpDeskQuestions }: Props) => {
    useEffect(() => {
      const getQuestions = async () => {
        const helpdeskques = await getHelpDeskQues(domainId);
        if (helpdeskques?.questions) {
          setHelpDeskQuestions(helpdeskques.questions || []);
        }
      };
      getQuestions();
    }, [domainId, setHelpDeskQuestions]);
  
    return (
      <div>
          <Card >
            <CardHeader>
              <CardTitle>Help Desk</CardTitle>
              <CardDescription>Add frequently asked questions.</CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-1 lg:grid-cols-2'>
              <HelpDeskForm domainId={domainId} setHelpDeskQuestions={setHelpDeskQuestions} />
              {helpDeskQuestions.length > 0 ? (
                <Accordion type="single" collapsible>
                  {helpDeskQuestions.map((q, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{q.question}</AccordionTrigger>
                      <AccordionContent>{q.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className='text-sm mb-0 mt-2 text-gray-700 text-center'>No questions to show</p>
              )}
            </CardContent>
          </Card>
      </div>
    );
  };

  export default HelpDesk;
  