"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getChatCompletion } from "@/api/chat";

export default function Homepage() {
  const [text, setText] = useState<string>("");

  const generateText = async () => {
    const reply = await getChatCompletion("Write me text in easy German");
    setText(reply.content ?? "");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create new reading</CardTitle>
      </CardHeader>
      <CardContent>{text ?? "..."}</CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={generateText}>Generate</Button>
      </CardFooter>
    </Card>
  );
}
