"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { GearIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LOCAL_STORAGE } from "@/app/constants";
import { useState } from "react";
import { useAppStore } from "@/stores/appStore";

const formSchema = z.object({
  chatApiToken: z.string().min(10, {
    message: "ChatGPT token is required",
  }),
});

export default function Settings() {
  const [open, setOpen] = useState(false);
  const setChatApiToken = useAppStore((state) => state.setChatApiToken);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatApiToken: "",
    },
  });

  function onSubmit({ chatApiToken }: z.infer<typeof formSchema>) {
    localStorage.setItem(LOCAL_STORAGE.CHAT_API_TOKEN, chatApiToken);
    setChatApiToken(chatApiToken);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <GearIcon className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">Settings</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="chatApiToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ChatGPT API Token</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter ChatGPT token here, in order to use an app.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
