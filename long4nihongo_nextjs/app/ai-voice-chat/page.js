"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Send, Play } from "lucide-react";
import Header from "@/components/site-header";
import SubtleParticleBackground from "@/components/ui/snow-effect";

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const recognitionRef = useRef();
  const synthRef = useRef(null);
  const [lastPlayedMessageId, setLastPlayedMessageId] = useState(null);
  const isPlayingRef = useRef(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    speak: "ja-JP",
    listen: "ja-JP",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize speech recognition
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = currentLanguage.listen;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setInput(transcript);
      };

      // Initialize speech synthesis
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = synthRef.current.getVoices();
        console.log("Available voices:", voices);

        const preferredVoice = voices.find(
          (voice) =>
            voice.lang === currentLanguage.speak &&
            voice.name.includes("Google")
        );
        if (preferredVoice) {
          synthRef.current.preferredVoice = preferredVoice;
          console.log("Preferred voice set:", preferredVoice.name);
        } else {
          console.warn(
            "Preferred voice not found. Default voice will be used."
          );
        }
      };

      // Ensure voices are loaded
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }
  }, [setInput, currentLanguage]);

  const speak = (text) => {
    if (synthRef.current) {
      // Stop any ongoing speech
      if (synthRef.current.speaking) {
        console.log("Cancelling ongoing speech...");
        synthRef.current.cancel();
      }

      if (!isPlayingRef.current) {
        isPlayingRef.current = true;
        setIsSpeaking(true);

        // Extract only the Japanese part (before the opening parenthesis)
        const japaneseText = text.split("(")[0].trim();

        const utterance = new SpeechSynthesisUtterance(japaneseText);
        utterance.lang = "ja-JP";

        // Find the appropriate voice for Japanese
        const voices = synthRef.current.getVoices();
        const preferredVoice = voices.find(
          (voice) => voice.lang === "ja-JP" && voice.name.includes("Google")
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
          console.log("Speech synthesis ended successfully.");
          setIsSpeaking(false);
          isPlayingRef.current = false;
        };

        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event);
          setIsSpeaking(false);
          isPlayingRef.current = false;
        };

        console.log("Starting speech synthesis for Japanese...");
        synthRef.current.speak(utterance);
      }
    } else {
      console.error("Speech synthesis not initialized.");
    }
  };

  const replayMessage = (messageId, content) => {
    speak(content);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  const handleVoiceSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage = {
      id: userMessageId,
      role: "user",
      content: input,
    };

    try {
      setMessages((prev) => [...prev, userMessage]);

      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [userMessage] }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      const assistantMessage = {
        id: data.id || `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.content) {
        console.log("data fine");
        speak(data.content);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "system",
          content:
            error.message ||
            "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background]">
      <SubtleParticleBackground />
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-2xl bg-[#111111] border border-gray-800 p-6 min-h-[600px] flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 text-emerald-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-white">
              AI Voice Assistant
            </h1>
          </div>

          <div className="flex-1 overflow-hidden relative h-[600px]">
            <div
              className="absolute inset-0 overflow-y-auto space-y-4 p-4 
                scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 
                hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-gray-800/50 text-white"
                    }`}
                  >
                    <div>{message.content}</div>
                    {message.role === "assistant" && (
                      <Button
                        onClick={() =>
                          replayMessage(message.id, message.content)
                        }
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-xs hover:bg-gray-700/50"
                        disabled={isSpeaking}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Play Again
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  setCurrentLanguage((prevLang) => ({
                    speak: prevLang.speak === "ja-JP" ? "vi-VN" : "ja-JP",
                    listen: prevLang.listen === "ja-JP" ? "vi-VN" : "ja-JP",
                  }))
                }
                className="h-12 px-6 bg-gray-800 hover:bg-gray-700 mr-2"
              >
                {currentLanguage.speak === "ja-JP"
                  ? "Switch to Vietnamese"
                  : "Switch to Japanese"}
              </Button>
              <Button
                onClick={toggleListening}
                className={`flex-1 h-12 ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                <Mic className="w-5 h-5 mr-2" />
                {isListening
                  ? `Listening (${
                      currentLanguage.listen === "ja-JP"
                        ? "Japanese"
                        : "Vietnamese"
                    })...`
                  : `Start Listening (${
                      currentLanguage.listen === "ja-JP"
                        ? "Japanese"
                        : "Vietnamese"
                    })`}
              </Button>
              {input && (
                <Button
                  onClick={handleVoiceSubmit}
                  className="h-12 px-6 bg-gray-800 hover:bg-gray-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
