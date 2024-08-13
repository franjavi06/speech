"use client";
import React from "react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const ChatForm = () => {
  const [text, setText] = useState<string>("");
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>();

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    if (Array.isArray(voices) && voices.length > 0) {
      setVoices(voices);
      return;
    }
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        const voices = window.speechSynthesis.getVoices();
        setVoices(voices);
      };
    }
  }, []);

  const handleSTT = () => {
    console.log("STT start");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "es-DO";
    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      console.log(transcript);
      console.log("STT finish");
      handleTTS(transcript);
    };
    recognition.start();
  };

  const availableVoices = voices?.filter(({ lang }) => lang.includes("es"));
  console.log(availableVoices);
  const activeVoice =
    //availableVoices?.find(({ name }) => name.includes("Ramona")) ||
    //availableVoices?.find(({ name }) => name.includes("Dominican")) ||
    availableVoices?.find(({ name }) => name.includes("Sabina")) ||
    availableVoices?.find(({ name }) => name.includes("Raul")) ||
    availableVoices?.find(({ name }) => name.includes("Goolge")) ||
    availableVoices?.[0];

  const handleTTS = (t: string) => {
    console.log("TTS start");
    let utterance = new SpeechSynthesisUtterance(t);
    utterance.lang = "es-DO";
    if (activeVoice) {
      utterance.voice = activeVoice;
      console.log(activeVoice);
    }
    //console.log(voices);

    window.speechSynthesis.speak(utterance);
    console.log("TTS finish");
  };

  return (
    <div className="bg-background px-6 py-4 flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={handleSTT}>
        <MicIcon className="w-5 h-5" />
        <span className="sr-only">Speech-to-text</span>
      </Button>
      <Textarea
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
      />
      <Button variant="ghost" size="icon">
        <Volume2Icon className="w-5 h-5" />
        <span className="sr-only">Text-to-speech</span>
      </Button>
      <Button
        type="submit"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-full"
      >
        Send
      </Button>
    </div>
  );
};

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function Volume2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export default ChatForm;
