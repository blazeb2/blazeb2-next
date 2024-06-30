import { Icon } from '@iconify/react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ImageLayout() {
  return (
    <Tabs defaultValue="grid" className="w-[128px] ml-2">
      <TabsList className="h-8">
        <TabsTrigger value="grid"><Icon icon="oui:grid" /></TabsTrigger>
        <TabsTrigger value="waterfalls"><Icon icon="icon-park-outline:waterfalls-v" /></TabsTrigger>
        <TabsTrigger value="table"><Icon icon="oui:table-density-expanded" /></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
