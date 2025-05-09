//apps/web/components/Dashboard/CreditsBadge.tsx
import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CreditsBadgeProps extends Omit<ButtonProps, 'ref'> {
  credits: number;
}

const CreditsBadge: React.FC<CreditsBadgeProps> = forwardRef<HTMLButtonElement, CreditsBadgeProps>(
  function CreditsBadge({ credits, className, ...buttonProps }, ref) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              ref={ref}
              {...buttonProps}
              variant="outline" 
              size="sm" 
              className="rounded-full px-3 py-2 flex items-center gap-1 border-kb-yellow hover:bg-accent/30"
            >
              <img 
                src="/7ae0bd34-56a9-46ca-8272-3780624e99e8.png" 
                alt="Kibi" 
                className="h-4 w-4 object-contain"
              />
              <span className="font-semibold">{credits}</span>
              <Plus className="h-4 w-4 ml-1" />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your automation credits - click to add more</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default CreditsBadge;
