"use client";

import { FolderOpen, PanelLeftClose, Plus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <Icon className="h-8 w-8 text-copy-faint" />
      <p className="text-sm font-medium text-copy-secondary">{title}</p>
      <p className="text-xs text-copy-muted">{description}</p>
    </div>
  );
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      aria-label="Projects"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "absolute inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-surface-border bg-surface/95 backdrop-blur transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <h2 className="text-sm font-semibold text-copy-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
          className="text-copy-secondary hover:bg-subtle hover:text-copy-primary"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="mine" className="min-h-0 flex-1 gap-0 p-3">
        <TabsList className="w-full bg-elevated">
          <TabsTrigger value="mine">My projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="mine" className="flex flex-col">
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            description="Projects you create will appear here."
          />
        </TabsContent>
        <TabsContent value="shared" className="flex flex-col">
          <EmptyState
            icon={Users}
            title="Nothing shared with you"
            description="Projects others share with you will appear here."
          />
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-surface-border p-3">
        <Button className="w-full">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
