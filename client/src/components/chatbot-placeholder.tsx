import { MessageCircle, Sparkles } from "lucide-react";

export default function ChatbotPlaceholder() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center fade-in">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Personal AI Assistant</h3>
          <p className="text-lg text-secondary mb-6">
            Coming Soon: Interactive chatbot powered by AI to answer questions about my experience,
            skills, and projects. Get instant insights into my technical expertise and career journey.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-primary" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="w-4 h-4 text-primary/50" />
              </div>
            </div>
            <span className="text-sm text-secondary">AI Integration in Development</span>
          </div>
          <div className="mt-6 text-sm text-slate-600">
            <p className="mb-2">
              This will implement a conversational AI agent using frameworks like CrewAI or LangGraph
            </p>
            <p>
              Ask questions about technologies, projects, or career experiences and get detailed,
              contextual responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
