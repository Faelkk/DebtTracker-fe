

const Container = ({children}: 
{children: React.ReactNode}
) => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {children}
    </main>
  )
}

export default Container