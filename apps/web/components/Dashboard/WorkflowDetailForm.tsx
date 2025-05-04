import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface WorkflowDetailFormProps {
  workflowId: string;
  onSubmit: (data: WorkflowFormData) => void;
  registerSubmit?: (fn: () => void) => void;
}

export interface WorkflowFormData {
  emailContent: string;
  frequency: string;
  emailAddress: string;
}

const WorkflowDetailForm: React.FC<WorkflowDetailFormProps> = ({ workflowId, onSubmit, registerSubmit }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const form = useForm<WorkflowFormData>({
    defaultValues: {
      emailContent: "",
      frequency: "daily",
      emailAddress: "",
    },
  });

  const handleSubmit = (data: WorkflowFormData) => {
    console.log('Form submitted:', data);
    onSubmit(data);
  };

  const submitFn = form.handleSubmit(handleSubmit);

  useEffect(() => {
    registerSubmit?.(submitFn);
  }, [registerSubmit, submitFn]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emailContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Content</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter email content" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter your email address" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full">Save Workflow Settings</Button>
      </form>
    </Form>
  );
};

export default WorkflowDetailForm;
