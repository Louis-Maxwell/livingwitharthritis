import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Chat Assistant</h1>
          <p className="text-muted-foreground">
            Ask questions and get instant AI-powered responses
          </p>
        </div>

        <ChatBot />
      </div>
    </div>
  );
};

export default Chat;
