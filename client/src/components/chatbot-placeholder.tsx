import { useState } from "react";
import { MessageCircle, X, Minimize2, ExternalLink } from "lucide-react";

export default function ChatbotPlaceholder() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center fade-in">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Professional Assistant</h3>
          <p className="text-lg text-secondary mb-6">
            Intelligent assistant trained on my expertise and experience. Ask about my AI solutions with CrewAI and LangGraph, 
            full-stack development experience, cloud architecture projects, and technical skills.
          </p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            data-testid="button-open-chat"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with My AI Assistant
          </button>
        </div>

        {/* Chat Interface */}
        {isChatOpen && (
          <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 ${isMinimized ? 'h-16' : 'h-[600px]'} ${isMinimized ? 'w-80' : 'w-[800px]'} flex flex-col`}>
            {/* Chat Header */}
            <div className="bg-primary text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Professional Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://huggingface.co/spaces/amar1087/professional_dialogue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="link-open-external"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="button-minimize-chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="button-close-chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content - Iframe */}
            {!isMinimized && (
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="https://amar1087-professional-dialogue.hf.space"
                  className="w-full h-full border-0 rounded-b-lg"
                  title="Professional Dialogue Chatbot"
                  data-testid="iframe-chatbot"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
