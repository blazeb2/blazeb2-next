'use client'

import { Icon } from '@iconify/react'
import { Login } from './login'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Setting() {
  return (
    <Sheet>
      <SheetTrigger><Icon icon="uiw:setting-o" className="text-gray-500 dark:text-gray-400" /></SheetTrigger>
      <SheetContent className="sm:max-w-[50%]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="Login" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="Login"><Login /></TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
