import React from 'react'
import {Table2} from 'lucide-react'

export default function Header() {
  return (
    <header className='w-full h-12 bg-foreground text-background flex items-center p-4 gap-1 shadow-lg'>
      <Table2 size={24} />
      <h1 className='font-medium text-2xl pt-[0.1rem]'>Manage</h1>
    </header>
  )
}
