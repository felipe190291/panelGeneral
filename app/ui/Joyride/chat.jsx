"use client";
import { useUIStore } from "@/app/store/ui-store";
import { useEffect } from "react";
export default function Chat() {
  const setRun = useUIStore((state) => state.setRun);
  const run = useUIStore((state) => state.run);
  const setStepIndex = useUIStore((state) => state.setStepIndex);
  useEffect(() => {
    if (run) {
      setStepIndex(1);
    }
  }, []);
  return (
    <div className="fixed bottom-5 right-5 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300">
      <button onClick={() => setRun(!run)}>💬</button>
    </div>
  );
}
