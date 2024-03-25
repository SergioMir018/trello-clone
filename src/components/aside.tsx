import React from 'react'
import { Separator } from './ui/separator'
import { Avatar } from './ui/avatar'
import { FolderKanban } from 'lucide-react'

export default function Aside() {
  const name = "Sergio's Project"

  return (
    <aside id='aside' className='w-1/4 bg-muted h-full lg:w-1/6'>
      <div id='name' className=' w-full flex items-center pl-2'>
        <Avatar>
          <div className='h-full w-full bg-foreground text-background flex justify-center items-center font-medium text-2xl'>{name[0].toUpperCase()}</div>
        </Avatar>

        <div className='p-4 flex- flex-col'>
          <h2 className='text-xl font-bold'>{name}</h2>
        </div>
      </div>

      <Separator />

      <div id='boards'>
        <div id='title' className='w-full flex items-center p-4 gap-2'>
          <FolderKanban size={24} />
          <h2 className='pt-[0.1rem]'>Tableros</h2>
        </div>

        <div id='boards-container'></div>
      </div>
    </aside>
  )
}
