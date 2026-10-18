"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ProjectDialogsController } from "@/hooks/use-project-dialogs";

export function ProjectDialogs({
  dialog,
  name,
  setName,
  slug,
  canSubmit,
  isLoading,
  close,
  submit,
}: ProjectDialogsController) {
  const type = dialog?.type;
  const projectName = dialog?.project?.name;

  const copy = {
    create: {
      title: "Create project",
      description: "Give your architecture workspace a name.",
      action: "Create project",
    },
    rename: {
      title: "Rename project",
      description: `Enter a new name for "${projectName}".`,
      action: "Save",
    },
    delete: {
      title: "Delete project",
      description: `Delete "${projectName}"? This action cannot be undone.`,
      action: "Delete",
    },
  };
  const current = type ? copy[type] : null;

  return (
    <Dialog open={dialog !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent showCloseButton={false}>
        {current && type && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
            className="grid gap-4"
          >
            <DialogHeader>
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription>{current.description}</DialogDescription>
            </DialogHeader>

            {type !== "delete" && (
              <div className="grid gap-2">
                <Input
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Project name"
                  aria-label="Project name"
                  disabled={isLoading}
                  maxLength={60}
                />
                {type === "create" && (
                  <p className="text-xs text-copy-muted">
                    Slug:{" "}
                    <span className="font-mono text-copy-secondary">
                      {slug || "your-project-name"}
                    </span>
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={close}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={type === "delete" ? "destructive" : "default"}
                disabled={!canSubmit || isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {current.action}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
