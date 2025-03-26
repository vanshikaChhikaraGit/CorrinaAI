import React from "react";
import { MaxWidthWrapper } from "./max-widht-wrapeer";
import { Heading } from "./Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

type Props = {};

const UpgradePlan = (props: Props) => {
  // wip integrate razorpay payment for plan upgradation
  return (
    <div className="mt-10">
      <div>
        <h1 className="mt-2 text-xl font-semibold">Billing Settings</h1>
        <p className="mt-2 text-sm">
          Add payment information, upgrade and modify your plan.
        </p>
      </div>
      <div>
        <Card className="hover:cursor-pointer">
          <CardHeader></CardHeader>
          <CardContent className="items-center justify-center flex flex-col">
            <p>
              <Plus></Plus>
            </p>
            <p>Upgrade Plan</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpgradePlan;
