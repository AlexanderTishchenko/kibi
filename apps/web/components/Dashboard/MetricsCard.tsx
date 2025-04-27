
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Clock, DollarSign } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: number;
  type?: 'time' | 'money' | 'custom';
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  type = 'time' 
}) => {
  const isPositiveTrend = trend > 0;
  
  return (
    <Card className="kb-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`p-2 rounded-full ${type === 'time' ? 'bg-kb-purple/10' : type === 'money' ? 'bg-kb-teal/10' : 'bg-primary/10'}`}>
            {type === 'time' ? 
              <Clock className="h-4 w-4 text-kb-purple" /> : 
              type === 'money' ? 
                <DollarSign className="h-4 w-4 text-kb-teal" /> :
                <ArrowUpRight className="h-4 w-4 text-primary" />
            }
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <div className={`flex items-center text-xs font-medium ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
            <ArrowUpRight className={`h-3 w-3 ${!isPositiveTrend && 'rotate-180'}`} />
            <span>{Math.abs(trend)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
