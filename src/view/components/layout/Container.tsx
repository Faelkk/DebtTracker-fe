import { cn } from "@/app/utils/cn"


const Container = ({children,className}: 
{children: React.ReactNode,className?: string}
) => {
  return (
    <main className={cn(" max-h-screen min-h-screen flex flex-col items-center justify-center bg-gray-50", className)} >
      {children}
    </main>
  )
}

export default Container