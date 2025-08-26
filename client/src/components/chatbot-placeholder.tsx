import { useState } from "react";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";

export default function ChatbotPlaceholder() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getIntelligentResponse = (userMessage: string): string => {
    const input = userMessage.toLowerCase();
    
    // AI and Machine Learning responses
    if (input.includes('ai') || input.includes('artificial intelligence') || input.includes('machine learning')) {
      if (input.includes('crewai') || input.includes('crew ai')) {
        return "I'm an expert in CrewAI for building multi-agent systems. I've developed custom AI crews for business automation, data analysis, and workflow orchestration. CrewAI allows me to create teams of specialized AI agents that collaborate to solve complex problems. I can help you design agent hierarchies, define roles, and implement efficient crew workflows.";
      } else if (input.includes('langgraph') || input.includes('lang graph')) {
        return "I specialize in LangGraph for building sophisticated AI agent workflows. I use it to create stateful, multi-step reasoning systems with conditional logic and human-in-the-loop interactions. LangGraph helps me build complex AI applications with graph-based agent architectures, perfect for enterprise automation and intelligent decision-making systems.";
      } else if (input.includes('autogen')) {
        return "I work with AutoGen to create multi-agent conversational systems. I've built solutions where multiple AI agents collaborate, debate, and refine outputs together. AutoGen is excellent for creating diverse perspectives in AI problem-solving and building robust, multi-viewpoint analysis systems.";
      }
      return "I'm an AI Solutions Consultant with deep expertise in CrewAI, LangGraph, AutoGen, and OpenAI SDK. I build intelligent automation systems, multi-agent workflows, and custom AI solutions for enterprise clients. I specialize in implementing RAG systems, fine-tuning models, and creating production-ready AI applications.";
    }
    
    // Frontend Development responses
    if (input.includes('frontend') || input.includes('react') || input.includes('angular') || input.includes('ui') || input.includes('javascript')) {
      if (input.includes('angular')) {
        return "I'm an Angular expert with 15+ years of experience building enterprise applications. I specialize in Angular 15+, TypeScript, RxJS, and NgRx for state management. I've built scalable applications with micro-frontend architectures, implemented custom directives, and created reusable component libraries. I can help with performance optimization, testing strategies, and modern Angular best practices.";
      } else if (input.includes('react')) {
        return "I'm proficient in React development with modern hooks, Context API, and state management solutions. I build responsive applications using React with TypeScript, implement custom hooks, and work with Next.js for full-stack solutions. I focus on component reusability, performance optimization, and clean architecture patterns.";
      }
      return "I have 15+ years of frontend development experience specializing in Angular and React. I build scalable web applications with TypeScript, implement modern UI/UX designs, and create responsive cross-platform solutions. I also work with React Native and Ionic for mobile development.";
    }
    
    // Cloud and Backend responses
    if (input.includes('aws') || input.includes('cloud') || input.includes('backend') || input.includes('serverless')) {
      return "I'm an AWS Cloud Architect with expertise in serverless solutions, Lambda functions, API Gateway, and DynamoDB. I design scalable cloud infrastructures, implement CI/CD pipelines, and build microservices architectures. I work with EC2, S3, CloudFormation, and have experience with cost optimization and security best practices.";
    }
    
    // Project and Experience responses
    if (input.includes('project') || input.includes('experience') || input.includes('portfolio') || input.includes('work')) {
      return "I've led development teams at companies like Forwood Enterprises, where I built enterprise applications and the Apps Platform. My recent focus is on AI consulting, implementing CrewAI and LangGraph solutions for business automation. I've delivered mobile apps, dashboard systems, cloud-native solutions, and AI-powered applications across various industries.";
    }
    
    // Skills and Technologies
    if (input.includes('skill') || input.includes('technology') || input.includes('tech stack')) {
      return "My core expertise includes: AI Solutions (CrewAI, LangGraph, AutoGen, OpenAI SDK), Frontend Development (Angular, React, TypeScript), Cloud Architecture (AWS, Serverless, Microservices), Backend Development (Node.js, Python, RESTful APIs), and Mobile Development (React Native, Ionic). I focus on building intelligent, scalable, and user-friendly applications.";
    }
    
    // Contact and Collaboration
    if (input.includes('contact') || input.includes('hire') || input.includes('work together') || input.includes('collaborate')) {
      return "I'm available for AI consulting, full-stack development projects, and cloud architecture solutions. You can reach me at amarjeet.kaur.1087@gmail.com. I specialize in helping businesses implement AI solutions, modernize their tech stack, and build scalable applications. Let's discuss how I can help with your project!";
    }
    
    // Default greeting/general response
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.length < 10) {
      return "Hello! I'm Amarjeet Kaur's AI assistant. I'm here to discuss my 15+ years of experience in AI solutions, full-stack development, and cloud architecture. I specialize in CrewAI, LangGraph, Angular, React, AWS, and building intelligent automation systems. What would you like to know about my expertise?";
    }
    
    return "I'm Amarjeet's AI assistant with 15+ years of experience in AI solutions, full-stack development, and cloud architecture. I specialize in CrewAI, LangGraph, Angular, React, Node.js, and AWS services. I can discuss my technical expertise, project experience, or help with questions about AI development, frontend/backend technologies, or cloud solutions. What specific area interests you?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate thinking time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const response = getIntelligentResponse(userMessage);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response
      }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm here to help you learn about Amarjeet's expertise in AI solutions, full-stack development, and cloud architecture. Please feel free to ask about her technical skills, projects, or experience!"
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
                      👋 Hi! I'm Amarjeet's AI assistant. Ask me about her AI solutions with CrewAI and LangGraph, full-stack development experience, AWS cloud projects, or any technical expertise!
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
