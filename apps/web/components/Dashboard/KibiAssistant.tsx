
import React, { useState } from 'react';
import HourglassIcon from '../ui/HourglassIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, MessageCircle } from 'lucide-react';

interface KibiAssistantProps {
  onClose: () => void;
}

const KibiAssistant: React.FC<KibiAssistantProps> = ({ onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("Hey there! I'm Kibi, your automation assistant. Need help finding the right workflows?");
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const suggestedActions = [
    "Analyze my workflow",
    "Show me popular automations",
    "How do I earn more credits?"
  ];
  
  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${expanded ? 'w-80' : 'w-auto'}`}>
      {expanded ? (
        <Card className="kb-card shadow-lg border-kb-purple border-2">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <HourglassIcon size={24} fillPercentage={65} className="text-kb-purple" />
                <h3 className="font-bold text-kb-purple">Kibi</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 mb-3">
              <p className="text-sm">{message}</p>
            </div>
            
            <div className="space-y-2">
              {suggestedActions.map((action, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start text-sm"
                  onClick={() => setMessage(`Great choice! Let me help you with "${action}"`)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button 
          className="h-14 w-14 rounded-full bg-gradient-to-r from-kb-purple to-kb-teal shadow-lg hover:shadow-xl"
          onClick={toggleExpanded}
        >
          <div className="relative">
            <HourglassIcon size={28} className="text-white animate-float" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-kb-yellow rounded-full" />
          </div>
        </Button>
      )}
    </div>
  );
};

export default KibiAssistant;
