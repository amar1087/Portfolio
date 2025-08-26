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
      // Method 1: Try Gradio Client first
      try {
        const client = await Client.connect("amar1087/professional_dialogue");
        const result = await client.predict("/predict", { text: userMessage });
        
        if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
          const response = result.data[0];
          setMessages(prev => [...prev, { role: 'assistant', content: response }]);
          return;
        }
      } catch (clientError) {
        console.log('Gradio client failed, trying direct API approach:', clientError);
      }

      // Method 2: Direct API call as fallback
      const response = await fetch('https://amar1087-professional-dialogue.hf.space/call/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [userMessage],
          session_hash: Math.random().toString(36).substring(7)
        }),
      });

      if (response.ok) {
        const submitData = await response.json();
        
        // Get result using event stream
        const resultResponse = await fetch(`https://amar1087-professional-dialogue.hf.space/call/predict/${submitData.event_id}`);
        const reader = resultResponse.body?.getReader();
        
        if (reader) {
          const decoder = new TextDecoder();
          let result = '';
          
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (Array.isArray(data) && data.length > 0) {
                    result = data[0];
                  }
                } catch (e) {
                  // Continue processing
                }
              }
            }
          }
          
          if (result) {
            setMessages(prev => [...prev, { role: 'assistant', content: result }]);
            return;
          }
        }
      }

      throw new Error('All connection methods failed');
      
    } catch (error) {
      console.error('Chatbot error:', error);
      // Smart fallback response based on user input
      let fallbackResponse = "Hello! I'm Amarjeet's AI assistant. I have 15+ years of experience in AI solutions, full-stack development, and cloud architecture.";
      
      const input = userMessage.toLowerCase();
      if (input.includes('ai') || input.includes('agent') || input.includes('crewai') || input.includes('langgraph')) {
        fallbackResponse = "I specialize in AI agent development using CrewAI, LangGraph, and AutoGen. I've built custom AI solutions for business process automation and data analysis. I work with OpenAI SDK and Hugging Face for implementing intelligent systems. What specific AI topic interests you?";
      } else if (input.includes('angular') || input.includes('react') || input.includes('frontend')) {
        fallbackResponse = "I'm an expert in frontend development with 15+ years of experience. I specialize in Angular and React, building scalable web applications with TypeScript. I've developed enterprise solutions, mobile apps with React Native and Ionic, and modern UI/UX interfaces. What frontend challenge can I help with?";
      } else if (input.includes('aws') || input.includes('cloud') || input.includes('backend')) {
        fallbackResponse = "I'm an AWS Cloud Architect with extensive experience in serverless solutions. I work with Lambda, EC2, S3, API Gateway, and DynamoDB. I've built scalable backend systems with Node.js and implemented CI/CD pipelines. I can discuss cloud architecture patterns and best practices. What cloud topic interests you?";
      } else if (input.includes('project') || input.includes('experience') || input.includes('work')) {
        fallbackResponse = "I've led development teams at companies like Forwood Enterprises, building enterprise applications and the Apps Platform. My recent work includes AI consulting projects using CrewAI and LangGraph. I've delivered mobile apps, dashboard systems, and cloud-native solutions. Would you like to know about specific projects or technologies?";
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackResponse
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
