"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getChatCompletion } from "@/api/chat";

export default function Homepage() {
  const [text, setText] = useState<string>("");
  const [level, setLevel] = useState<string>("A1");
  const [langueage, setLanguage] = useState<string>("German");

  const generateText = async () => {
    const reply = await getChatCompletion(
      `Write me text in easy ${langueage}, that equivalent to ${level} language level. Don't say additional comments.`
    );
    setText(reply.content ?? "Failed to generate text");
  };

  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>Create new reading</CardTitle>
      </CardHeader>
      <CardContent>{text ?? "..."}</CardContent>
      <CardFooter className="flex justify-between">
        <Select value={langueage} onValueChange={setLanguage}>
          <SelectTrigger className="me-5">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="Ukrainian">Ukrainian</SelectItem>
          </SelectContent>
        </Select>

        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="me-5">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A1">A1</SelectItem>
            <SelectItem value="A2">A2</SelectItem>
            <SelectItem value="B1">B1</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={generateText}>Generate</Button>
      </CardFooter>
    </Card>
  );
}
