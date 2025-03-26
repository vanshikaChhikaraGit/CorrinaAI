import { ReactNode } from "react"

interface MaxWidthWrapperProps {
  className?: string
  children: ReactNode
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className= "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20" >
      {children}
    </div>
  )
}