'use client'

import { Icon } from '@iconify/react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ConfigStore } from '@/lib/store/config'
import { useConfigStore } from '@/lib/store/config'

export function ImageLayout() {
  const { imgLayout, setImgLayout } = useConfigStore(state => state)
  return (
    <Tabs
      value={imgLayout}
      className="w-[128px] ml-2"
      onValueChange={value => setImgLayout(value as ConfigStore['imgLayout'])}
    >
      <TabsList
        className="h-8"
      >
        <TabsTrigger value="grid"><Icon icon="oui:grid" /></TabsTrigger>
        <TabsTrigger value="masonry"><Icon icon="icon-park-outline:waterfalls-v" /></TabsTrigger>
        <TabsTrigger value="table"><Icon icon="oui:table-density-expanded" /></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
