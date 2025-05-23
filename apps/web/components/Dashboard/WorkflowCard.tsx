import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Activity, PlayCircle, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import WorkflowDetailForm, { WorkflowFormData } from './WorkflowDetailForm';

export interface WorkflowCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  timeSaved: string;
  creditsRequired: number;
  popularity: number;
  isInstalled?: boolean;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  id,
  title,
  description,
  category,
  timeSaved,
  creditsRequired,
  popularity,
  isInstalled = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const formSubmitRef = useRef<() => void>();

  const handleRunWorkflow = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      formSubmitRef.current?.();
    }
  };

  const handleInstallWorkflow = () => {
    setIsExpanded(true);
  };

  const handleFormSubmit = async (data: WorkflowFormData) => {
    setIsLoading(true);
    try {
      // Deduct credits via PATCH
      const res = await fetch('/api/me/credits', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deduct: creditsRequired }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to deduct credits');

      // Optionally: run workflow logic here
      toast({
        title: 'Workflow executed',
        description: `Successfully deducted ${creditsRequired} credits.`,
      });
      // Refresh credits in UI
      queryClient.invalidateQueries({ queryKey: ['credits'] });
      setIsExpanded(false);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to execute workflow',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`kb-card kb-card-hover overflow-hidden h-full flex flex-col ${isExpanded ? 'col-span-2' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <Badge variant="outline" className="mt-1 bg-secondary">
              {category}
            </Badge>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < popularity ? "text-kb-yellow fill-kb-yellow" : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Popularity rating: {popularity}/5</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{description}</p>
        
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center text-xs">
            <Clock className="text-kb-purple h-3 w-3 mr-1" />
            <span className="text-muted-foreground">Saves {timeSaved}</span>
          </div>
          <div className="flex items-center text-xs">
            <Activity className="text-kb-teal h-3 w-3 mr-1" />
            <span className="text-muted-foreground">{creditsRequired} credits</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4">
            <WorkflowDetailForm
              workflowId={id}
              onSubmit={handleFormSubmit}
              registerSubmit={(fn) => (formSubmitRef.current = fn)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <div className="w-full space-y-2">
          {isInstalled ? (
            <Button type="submit"
              variant="default"
              className="w-full bg-kb-purple hover:bg-kb-purple/90"
              onClick={handleRunWorkflow}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Run workflow
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-kb-teal text-kb-teal hover:bg-kb-teal/10"
              onClick={handleInstallWorkflow}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Install workflow
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Configure workflow
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkflowCard;
