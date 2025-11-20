"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MockLoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export function MockLoginModal({ open, onClose, onLogin }: MockLoginModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError(t("auth.emailRequired"));
      return;
    }

    onLogin(email);
    setEmail("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {t("auth.title")}
          </DialogTitle>
          <DialogDescription>
            {t("auth.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {t("auth.continueButton")}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t("auth.disclaimer")}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

