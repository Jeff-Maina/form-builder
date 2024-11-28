"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
        
const formSchema = z
  .object({
      age: z.coerce.number(),
      urlinput: z.string()
        .url(),
      checkbox: z.boolean()
  })
  .required({
      age: true,
      urlinput: true,
      checkbox: true
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
        <h1 className="text-xl font-bold tracking-tight">Enter form's title</h1>
        <p className="text-sm text-neutral-500">This is a placeholder for the form's description </p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="Enter your age" {...field} />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urlinput"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Url Input</FormLabel>
                <FormControl>
                  <Input type='url' placeholder="Placeholder" {...field} />
                </FormControl>
                <FormDescription>
                  This is a description message
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkbox"
            render={({ field }) => (
              <FormItem
                className="flex items-start space-x-3 space-y-0 rounded-md border p-4"
              >
                <FormControl>
                  <Checkbox  checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="grid gap-1.5 leading-none">
                 <FormLabel>
                    Checkbox
                    <span className="ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>This is a description message</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}