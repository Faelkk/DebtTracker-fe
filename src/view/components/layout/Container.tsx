import { cn } from "@/app/utils/cn"


const Container = ({children,className}: 
{children: React.ReactNode,className?: string}
) => {
  return (
    <main className={cn("  min-h-screen flex flex-col items-center justify-center bg-woodsmoke-100", className)} >
      {children}
    </main>
  )
}

export default Container