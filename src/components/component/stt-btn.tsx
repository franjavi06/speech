"use client"
import React from 'react'
import { Button } from '../ui/button'

const SttBtn = () => {
    const handleSTT = () => {
        console.log("STT")
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "es-DO";
        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            console.log(transcript);
        };
        recognition.start();
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleSTT}>
            <MicIcon className="w-5 h-5" />
            <span className="sr-only">Speech-to-text</span>
        </Button>
    )
}

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
    )
  }
export default SttBtn