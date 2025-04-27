
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Linkedin, User, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  onClick?: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  title,
  description,
  icon,
  isCompleted = false,
  onClick,
}) => {
  return (
    <Card 
      className={cn(
        "kb-card p-3 cursor-pointer hover:border-primary transition-all", 
        isCompleted ? 'border-kb-yellow bg-accent/10' : ''
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-1.5 rounded-full flex items-center justify-center",
            isCompleted ? 'bg-kb-yellow/20' : 'bg-secondary'
          )}>
            {isCompleted ? 
              <Check className="h-4 w-4 text-kb-yellow" /> : 
              <div className="h-4 w-4 flex items-center justify-center">
                {icon}
              </div>
            }
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistItem;
