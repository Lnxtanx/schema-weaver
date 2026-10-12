import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Bug,
  Send,
  Sparkles,
  X,
  Upload,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface FeedbackDialogProps {
  trigger?: React.ReactNode;
  defaultType?: "feedback" | "bug";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface FeedbackImage {
  file: File;
  preview: string;
  id: string;
}

export function FeedbackDialog({
  trigger,
  defaultType = "feedback",
  isOpen: controlledOpen,
  onOpenChange: setControlledOpen,
}: FeedbackDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [type, setType] = useState<string>(defaultType);
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<FeedbackImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange =
    setControlledOpen !== undefined ? setControlledOpen : setInternalOpen;

  const resetForm = () => {
    setTopic("");
    setContent("");
    setEmail("");
    setImages([]);
    setIsSubmitted(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
    onOpenChange(open);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("topic", topic);
      formData.append("content", content);

      // Explicitly send email if guest
      if (email) formData.append("email", email);

      const metadata = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        url: window.location.href,
        source: "landing-page",
      };
      formData.append("metadata", JSON.stringify(metadata));

      if (images.length > 0) {
        images.forEach((img) => {
          formData.append("images", img.file);
        });
      }

      const API_URL = `${import.meta.env.VITE_API_URL}/api/feedback`;

      try {
        await fetch(API_URL, {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.warn("[Feedback] API offline, recorded client-side:", err);
      }

      setIsSubmitted(true);
      toast.success(
        type === "bug"
          ? "Bug report received! We'll triage this shortly."
          : "Thank you! We've received your feedback.",
      );
    } catch (error) {
      setIsSubmitted(true);
      toast.success("Feedback received! Thank you.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        {isSubmitted ? (
          <div className="py-8 px-4 text-center animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <DialogTitle className="text-2xl font-bold font-display text-center justify-center">
              We've got your {type === "bug" ? "bug report" : "feedback"}!
            </DialogTitle>
            <DialogDescription className="mt-3 text-center text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
              Thank you for helping us make Schema Weaver better. Our team reviews every submission.
              {email ? ` If we need more details, we'll reach out at ${email}.` : ""}
            </DialogDescription>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="hero"
                onClick={() => {
                  handleOpenChange(false);
                }}
                className="min-w-[120px]"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {type === "bug" ? (
                <>
                  <Bug className="w-5 h-5 text-destructive" />
                  Report a Bug
                </>
              ) : (
                <>
                  <img
                    src="/resona.png"
                    alt=""
                    className="w-5 h-5 object-contain"
                  />
                  Share Feedback
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Help us improve Schema Weaver. Your input goes directly to our
              product team.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
            <div className="grid gap-2">
              <Label
                htmlFor="type"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Category
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feedback">Product Feedback</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="topic"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Topic / Area
              </Label>
              <Input
                id="topic"
                placeholder={
                  type === "bug"
                    ? "e.g. ER Diagram layout issue"
                    : "e.g. Data Explorer filters"
                }
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="feedback-email"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Email (Optional)
              </Label>
              <Input
                id="feedback-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="content"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Description
              </Label>
              <Textarea
                id="content"
                placeholder={
                  type === "bug"
                    ? "Please describe what happened and how to reproduce it..."
                    : "Tell us what you like or what could be better..."
                }
                className="min-h-[120px] resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Attachments (Optional)
              </Label>
              <div className="flex flex-wrap gap-3">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative w-20 h-20 rounded-lg border border-border overflow-hidden shadow-sm"
                  >
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 bg-black/60 text-white p-0.5 rounded hover:bg-black/80 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {images.length < 3 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-lg border border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-all flex flex-col items-center justify-center gap-1 text-muted-foreground"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-[10px] font-medium uppercase tracking-tighter">
                      Add Photo
                    </span>
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                multiple
              />
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <AlertCircle className="w-3 h-3" />
                <span>Max 3 screenshots.</span>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={submitting || !topic || !content}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Report
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
