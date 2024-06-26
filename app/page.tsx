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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getChatCompletion } from "@/api/chat";
import { ReloadIcon } from "@radix-ui/react-icons";
import Loading from "../components/loading";
import { useAppStore } from "@/stores/appStore";

type Language = "English" | "German" | "Spanish";
type Sentence = Record<Language, string>;
type Level = "A1" | "A2" | "B1" | "B2";

export default function Homepage() {
  const [content, setContent] = useState<Sentence[]>();
  const [level, setLevel] = useState<Level>("A1");
  const [language, setLanguage] = useState<Language>("German");
  const [alert, setAlert] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const chatApiToken = useAppStore((state) => state.chatApiToken);

  const generateText = async () => {
    setIsLoading(true);
    const reply = await getChatCompletion(
      `Write me exciting story in easy ${language}, that equivalent to ${level} language level. Don't say additional comments. Format text as array of sentences in JSON, using this format: [ {"${language}": "text",  "English": "text"} ... ]. Dont wrap in json code format.`,
      {
        token: chatApiToken,
      }
    );
    try {
      const sentences = JSON.parse(reply.content ?? "");
      setContent(sentences);
    } catch (e) {
      setAlert("Failed to generate text");
    }
    setIsLoading(false);
  };

  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>Create new reading</CardTitle>
      </CardHeader>
      <CardContent>
        {alert && (
          <Alert variant="destructive" className="my-6">
            <AlertTitle>{alert}</AlertTitle>
          </Alert>
        )}
        {!chatApiToken && (
          <Alert variant="destructive" className="my-6">
            Please set you ChatGPT token in <b>Settings</b> in order to use this
            app
          </Alert>
        )}
        {!isLoading && !content && chatApiToken && (
          <Alert>
            Press <b>Generate</b> button to create a story.
          </Alert>
        )}
        {isLoading && <Loading className="my-10" />}
        {!isLoading &&
          content?.map((sentence: Sentence) => (
            <HoverCard key={sentence[language]}>
              <HoverCardTrigger className="hover:underline cursor-pointer me-2">
                {sentence[language]}
              </HoverCardTrigger>
              <HoverCardContent>{sentence["English"]}</HoverCardContent>
            </HoverCard>
          ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* @ts-ignore */}
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="me-5">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="Ukrainian">Ukrainian</SelectItem>
          </SelectContent>
        </Select>

        {/* @ts-ignore */}
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

        <Button onClick={generateText} disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Generate
        </Button>
      </CardFooter>
    </Card>
  );
}
