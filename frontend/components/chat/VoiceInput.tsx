"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onClose: () => void;
}

export default function VoiceInput({ onTranscript, onClose }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [volume, setVolume] = useState(0);
  const recognitionRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Volume analyser
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      function updateVolume() {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setVolume(avg / 128);
        animFrameRef.current = requestAnimationFrame(updateVolume);
      }
      updateVolume();

      // Speech Recognition
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) setTranscript((prev) => prev + finalTranscript);
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied:", err);
    }
  }

  function stopRecording() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsRecording(false);
    setVolume(0);
  }

  function handleSend() {
    if (transcript.trim()) {
      onTranscript(transcript.trim());
      setTranscript("");
    }
    stopRecording();
    onClose();
  }

  function handleClose() {
    stopRecording();
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-full left-0 right-0 mb-2 mx-3 bg-[#111] border border-white/[0.08] rounded-[16px] p-4 shadow-xl z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[13px] text-white/60 font-medium">
            Voice Input
          </span>
          <button
            onClick={handleClose}
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mic + Visualizer */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative">
            {/* Pulse rings */}
            {isRecording && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-red-500/30"
                    animate={{
                      scale: 1 + i * 0.3 + volume * 0.5,
                      opacity: 1 - i * 0.25,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </>
            )}

            {/* Mic Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-colors z-10 ${
                isRecording
                  ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                  : "bg-[#1a1a1a] border border-white/10"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white/60" />
              )}
            </motion.button>
          </div>

          <p className="text-[12px] text-white/30">
            {isRecording
              ? "Recording... tap to stop"
              : "Tap to start recording"}
          </p>
        </div>

        {/* Transcript Preview */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-[#0a0a0a] border border-white/[0.06] rounded-[10px] px-3 py-2.5 mb-3"
          >
            <div className="text-[10px] text-white/25 mb-1">Transcript</div>
            <div className="text-[13px] text-white/65 leading-relaxed">
              {transcript}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 py-2 rounded-[8px] text-[12px] text-white/40 border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!transcript.trim()}
            className="flex-1 py-2 rounded-[8px] text-[12px] text-white font-medium bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
