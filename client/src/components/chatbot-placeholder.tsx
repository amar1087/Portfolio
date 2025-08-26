import { useState } from "react";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { Client } from "@gradio/client";

export default function ChatbotPlaceholder() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Using Gradio Client for reliable connection to your Professional Dialog agent
      const client = await Client.connect("amar1087/professional_dialogue");
      const result = await client.predict("/predict", [userMessage]);
      
      if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
        const response = result.data[0];
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      } else {
        throw new Error('No response received from the agent');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      // Fallback response for connection issues
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm Amarjeet's professional assistant. I can help you learn about her 15+ years of experience in AI solutions, full-stack development, and cloud architecture. I specialize in CrewAI, LangGraph, Angular, React, Node.js, and AWS services. What would you like to know about her expertise?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center fade-in">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Professional Assistant</h3>
          <p className="text-lg text-secondary mb-6">
            Powered by my custom Professional Dialog agent on Hugging Face. Ask about my AI solutions, 
            development experience, cloud architecture projects, and technical expertise.
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
          <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 ${isMinimized ? 'h-16' : 'h-96'} w-80 flex flex-col`}>
            {/* Chat Header */}
            <div className="bg-primary text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Professional Assistant</span>
              </div>
              <div className="flex items-center gap-2">
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

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-secondary text-sm">
                      👋 Hi! I'm Amarjeet's AI assistant. Ask me about her AI solutions, full-stack development experience, AWS cloud projects, or any technical expertise. I'm powered by her Professional Dialog agent on Hugging Face!
                    </div>
                  )}
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.role === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-900 px-3 py-2 rounded-lg text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-slate-200 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about my experience..."
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      data-testid="input-chat-message"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="button-send-message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
