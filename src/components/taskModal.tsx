// components/ChatDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useTaskStore } from "./taskStore";

export function ChatDialog() {
  const { isModalOpen, setIsModalOpen } = useTaskStore();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#7FB2F0] to-[#ADD6FF] 
            text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
            border-2 border-white/80 p-4 flex items-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-bold pixelated">Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-gradient-to-b from-[#7FB2F0] to-[#ADD6FF] 
        border-4 border-white rounded-[30px] shadow-2xl"
      >
        <DialogHeader className="bg-white/90 rounded-2xl p-4 mb-4">
          <DialogTitle className="text-xl font-bold text-[#4A6FA5] pixelated flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Task Chat
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 p-4 mb-4 bg-white/90 rounded-2xl max-h-[400px]">
          {/* Example messages - you can make these dynamic later */}
          <div className="bg-[#7FB2F0]/10 p-3 rounded-2xl ml-auto max-w-[80%]">
            <p className="text-[#4A6FA5] font-medium">
              How's the task progress?
            </p>
            <span className="text-xs text-[#4A6FA5]/70">12:34 PM</span>
          </div>
          <div className="bg-white p-3 rounded-2xl max-w-[80%]">
            <p className="text-[#4A6FA5] font-medium">
              Almost done with the UI improvements!
            </p>
            <span className="text-xs text-[#4A6FA5]/70">12:35 PM</span>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 bg-white/90 rounded-2xl p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-full px-4 py-2 border-2 border-[#7FB2F0]/30 
                focus:outline-none focus:border-[#7FB2F0] bg-white text-[#4A6FA5]
                placeholder-[#4A6FA5]/50"
            />
            <Button
              className="rounded-full bg-[#7FB2F0] hover:bg-[#ADD6FF] text-white
                border-2 border-white/80 p-4 h-auto"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
