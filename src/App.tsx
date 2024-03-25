import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import Aside from '@/components/aside';
function App() {
  return (
    <>
      <div id='header' className='w-full'>
        <Header />
      </div>

      <main className='flex h-screen'>
        <Aside />
        <Separator orientation='vertical' />
        <div id='content'></div>
      </main>
    </>
  )
}

export default App
