'use client'

import * as React from 'react'
import { Folder, Layout, Workflow } from 'lucide-react'
import { Icon } from '@iconify/react'
import { Tree } from '@/components/ui/tree'

const data = [
  { id: '1', name: 'Unread' },
  { id: '2', name: 'Threads' },
  {
    id: '3',
    name: 'Chat Rooms',
    children: [
      { id: 'c1', name: 'General' },
      { id: 'c2', name: 'Random' },
      { id: 'c3', name: 'Open Source Projects' },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    children: [
      {
        id: 'd1',
        name: 'Alice',
        children: [
          { id: 'd11', name: 'Alice2', icon: Layout },
          { id: 'd12', name: 'Bob2' },
          { id: 'd13', name: 'Charlie2' },
        ],
      },
      { id: 'd2', name: 'Bob', icon: Layout },
      { id: 'd3', name: 'Charlie' },
    ],
  },
  {
    id: '5',
    name: 'Direct Messages',
    children: [
      {
        id: 'e1',
        name: 'Alice',
        children: [
          { id: 'e11', name: 'Alice2' },
          { id: 'e12', name: 'Bob2' },
          { id: 'e13', name: 'Charlie2' },
        ],
      },
      { id: 'e2', name: 'Bob' },
      { id: 'e3', name: 'Charlie' },
    ],
  },
  {
    id: '6',
    name: 'Direct Messages',
    children: [
      {
        id: 'f1',
        name: 'Alice',
        children: [
          { id: 'f11', name: 'Alice2' },
          { id: 'f12', name: 'Bob2' },
          { id: 'f13', name: 'Charlie2' },
        ],
      },
      { id: 'f2', name: 'Bob' },
      { id: 'f3', name: 'Charlie' },
    ],
  },
]

export function Wrapper() {
  const [content, setContent] = React.useState('Admin Page')
  return (
    <div className="flex min-h-full space-x-2">
      <aside className="flex-shrink-0 w-[300px] h-full p-2 border-r border-r-[--b2-other-color]">
        <div className="flex items-center justify-between p-2 text-[--b2-text-color-bold]">
          <h4>File Manage</h4>
          <Icon icon="fluent:folder-add-32-regular" className="h-[1.5em] w-[1.5em] cursor-pointer hover:scale-110" />
        </div>
        <Tree
          data={data}
          initialSlelectedItemId="f12"
          className="h-[--aside-height]"
          onSelectChange={item => setContent(item?.name ?? '')}
          folderIcon={Folder}
          itemIcon={Workflow}
        />
      </aside>
      <section className="flex-1">{content}</section>
    </div>
  )
}
