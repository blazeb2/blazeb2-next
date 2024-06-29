'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/lib/hooks/useLogin'

export function Login() {
  const { login, loginInfo } = useLogin()

  const FormSchema = z.object({
    app_id: z.string().min(2, {
      message: 'app_id must be at least 2 characters.',
    }),
    app_secret: z.string().min(2, {
      message: 'app_secret must be at least 2 characters.',
    }),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      app_id: loginInfo?.app_id,
      app_secret: loginInfo?.app_secret,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { app_id, app_secret } = data
    login({ app_id, app_secret })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="app_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>APPID</FormLabel>
                <FormControl>
                  <Input placeholder="please fit appid" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="app_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>APPSECRET</FormLabel>
                <FormControl>
                  <Input placeholder="please fit appSecret" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
