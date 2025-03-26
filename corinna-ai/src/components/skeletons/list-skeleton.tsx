import { Skeleton } from "@/components/ui/skeleton"

 function SkeletonDemo() {
  return (
    [...Array(3)].map((_,index)=>(
<div key={index} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
    </div>
    ))
    
  )
}

export default SkeletonDemo;
