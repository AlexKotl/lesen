"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function Loading(props: { className: string }) {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((progress) => progress + 3);
      if (progress >= 90) {
        clearInterval(intervalId);
      }
    }, 400);
  }, []);

  return <Progress value={progress} className={props.className} />;
}
