"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
      password: z.string(),
      websitelink: z.string()
        .url()
  })
  .required({
      password: true,
      websitelink: true
  })

export default function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); 
  }

  return (
    <div className='max-w-lg rounded-md border p-4 flex flex-col gap-6'>
      <header className='flex flex-col gap-2'>
        <h1 className="text-xl font-bold tracking-tight">Registration form</h1>
        <p className="text-sm text-neutral-500">Enter your details to get started </p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter password" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websitelink"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Website Link</FormLabel>
              <FormControl>
                <Input type='url' placeholder="Enter website link" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}