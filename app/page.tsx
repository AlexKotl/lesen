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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getChatCompletion } from "@/api/chat";

type Language = "English" | "German" | "Spanish";
type Sentence = Record<Language, string>;
type Level = "A1" | "A2" | "B1" | "B2";

export default function Homepage() {
  const [content, setContent] = useState<Sentence[]>();
  const [level, setLevel] = useState<Level>("A1");
  const [langueage, setLanguage] = useState<Language>("German");
  const [alert, setAlert] = useState<string>();

  const generateText = async () => {
    const reply = await getChatCompletion(
      `Write me text in easy ${langueage}, that equivalent to ${level} language level. Don't say additional comments. Format text as array of sentences in JSON, using this format: [ {"${langueage}": "text",  "English": "text"} ... ]. Dont wrap in json code format.`
    );
    try {
      const sentences = JSON.parse(reply.content ?? "");
      setContent(sentences);
    } catch (e) {
      setAlert("Failed to generate text");
    }
  };

  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>Create new reading</CardTitle>
      </CardHeader>
      <CardContent>
        {alert && (
          <Alert variant="destructive">
            <AlertTitle>{alert}</AlertTitle>
          </Alert>
        )}

        {content?.map((sentence: Sentence) => (
          <span key="">{sentence[langueage]}</span>
        ))}
      </CardContent>
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
