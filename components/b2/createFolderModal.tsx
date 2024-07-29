'use client'

import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { FolderTree } from '@/lib/store/config'
import { useConfigStore } from '@/lib/store/config'

/**
 * @param tree
 * @param parentId
 * @param newNode
 * @param type
 * @returns
 */
function insertNode(
  tree: FolderTree[],
  parentId: string,
  newNode: FolderTree,
  type: 'current' | 'child',
) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === parentId) {
      if (type === 'child') {
        if (
          node.children
          && node.children.some(child => child.name === newNode.name)
        ) {
          return false
        }

        if (!node.children) {
          node.children = []
        }
        node.children.push(newNode)
      }
      else if (type === 'current') {
        if (tree.some(sibling => sibling.name === newNode.name)) {
          return false
        }

        tree.splice(i + 1, 0, newNode)
      }
      return true
    }

    if (node.children) {
      const inserted = insertNode(node.children, parentId, newNode, type)
      if (inserted) {
        return true
      }
    }
  }

  return false
}

interface IProfileForm {
  callback: () => void
}
function ProfileForm(props: IProfileForm) {
  const { callback } = props
  const { selected, folder, setFolder, setSelected } = useConfigStore()
  const [tempFolder, setTempFolder] = useState<{
    folders: FolderTree[]
    selected: {
      folder: string
      id: string
    }
  }>()
  const FormSchema = z.object({
    folderName: z.string().regex(/^[\w-]+$/, {
      message: 'folder name must be alphanumeric, underscore, or hyphen',
    }),
    folderPosition: z.boolean(),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      folderName: dayjs().format('YYYY-MM-DD'),
      folderPosition: true,
    },
  })

  const { folderPosition, folderName } = form.watch()

  const positionName = useMemo(() => {
    return folderPosition ? 'subfolder' : 'current folder'
  }, [folderPosition])

  useEffect(() => {
    const folderCopy = cloneDeep(folder)
    let newFolder = selected.folder

    if (folderPosition) {
      newFolder = `${selected.folder}${folderName}/`
    }
    else if (newFolder) {
      newFolder = `${newFolder.split('/').slice(0, -2).join('/')}/${folderName}/`
    }

    const uid = uuidv4()
    insertNode(
      folderCopy,
      selected.id,
      {
        id: uid,
        name: folderName,
        folder: newFolder,
        children: [],
      },
      folderPosition ? 'child' : 'current',
    )

    setTempFolder({
      folders: folderCopy,
      selected: {
        folder: newFolder,
        id: uid,
      },
    })
  }, [folderPosition, folderName])

  function onSubmit() {
    if (tempFolder) {
      setFolder(tempFolder.folders)
      callback?.()
      setSelected({
        folder: tempFolder.selected.folder,
        id: tempFolder.selected.id,
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="folderPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Folder Position
                <Badge className="mx-2" variant="outline">{selected.folder}</Badge>
                <Badge variant="outline">{positionName}</Badge>
              </FormLabel>
              <FormControl>
                <div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="folderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folder Name</FormLabel>
              <FormControl>
                <Input placeholder="Please fit english folder name." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="sm" type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export function CreateFolderModal() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Icon icon="fluent:folder-add-32-regular" className="h-[1.5em] w-[1.5em] cursor-pointer hover:scale-110" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>
            The folder will be created in the currently selected folder, which is either the current directory or its parent directory.
          </DialogDescription>
          <ProfileForm callback={() => setOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
