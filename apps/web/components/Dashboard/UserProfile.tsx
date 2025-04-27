
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Clock, DollarSign, Linkedin, User, Image, Trophy } from "lucide-react";
import ChecklistItem from './AchievementCard';

interface UserProfileProps {
  name: string;
  avatar: string;
  level: number;
  progress: number;
  totalTimeSaved: string;
  totalMoneySaved: string;
  achievements: {
    title: string;
    description: string;
    progress: number;
    reward: string;
    isCompleted: boolean;
  }[];
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  avatar,
  level,
  progress,
  totalTimeSaved,
  totalMoneySaved,
}) => {
  // Setup profile completion checklist
  const checklistItems = [
    {
      title: "Follow K.B on LinkedIn",
      description: "Stay updated with the latest news and features",
      icon: <Linkedin className="h-3 w-3 text-primary" />,
      isCompleted: false,
      onClick: () => window.open("https://linkedin.com", "_blank")
    },
    {
      title: "Complete your profile",
      description: "Add your job role and organization details",
      icon: <User className="h-3 w-3 text-primary" />,
      isCompleted: true,
      onClick: () => console.log("Navigate to profile page")
    },
    {
      title: "Upload a profile picture",
      description: "Personalize your account with a photo",
      icon: <Image className="h-3 w-3 text-primary" />,
      isCompleted: false,
      onClick: () => console.log("Open image upload dialog")
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="kb-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <span>Your Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Avatar className="h-14 w-14 border-2 border-primary">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-primary text-primary-foreground">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h3 className="font-semibold text-base">{name}</h3>
              <div className="flex items-center mt-1">
                <Badge className="bg-primary mr-2 text-xs">Level {level}</Badge>
                <Badge variant="outline" className="flex items-center text-xs">
                  <Trophy className="h-2.5 w-2.5 mr-1 text-kb-yellow" />
                  <span>Pioneer</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Next Level</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-lg p-2 text-center">
              <div className="flex items-center justify-center text-xs text-muted-foreground mb-0.5">
                <Clock className="h-3 w-3 mr-1" />
                <span>Time Saved</span>
              </div>
              <p className="text-lg font-semibold text-primary">{totalTimeSaved}</p>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-center">
              <div className="flex items-center justify-center text-xs text-muted-foreground mb-0.5">
                <DollarSign className="h-3 w-3 mr-1" />
                <span>Money Saved</span>
              </div>
              <p className="text-lg font-semibold text-primary">{totalMoneySaved}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="kb-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <ClipboardCheck className="h-4 w-4 mr-2 text-primary" />
            Account Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="grid grid-cols-1 gap-2">
            {checklistItems.map((item, index) => (
              <ChecklistItem 
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                isCompleted={item.isCompleted}
                onClick={item.onClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
