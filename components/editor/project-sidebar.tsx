"use client";

import {
  FolderOpen,
  PanelLeftClose,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onCreate: () => void;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
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

interface ProjectItemProps {
  project: Project;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  return (
    <li className="group flex items-center gap-1 rounded-xl px-2 py-1.5 hover:bg-subtle">
      <span className="min-w-0 flex-1 truncate text-sm text-copy-secondary group-hover:text-copy-primary">
        {project.name}
      </span>
      {project.isOwner && (
        <div className="flex shrink-0 items-center opacity-100 md:opacity-0 md:transition-opacity md:group-focus-within:opacity-100 md:group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRename(project)}
            aria-label={`Rename ${project.name}`}
            className="text-copy-muted hover:text-copy-primary"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(project)}
            aria-label={`Delete ${project.name}`}
            className="text-copy-muted hover:text-state-error"
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </li>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onCreate,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const owned = projects.filter((p) => p.isOwner);
  const shared = projects.filter((p) => !p.isOwner);

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        tabIndex={-1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 z-10 bg-base/70 backdrop-blur-sm transition-opacity duration-200 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-label="Projects"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "absolute inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-surface-border bg-surface/95 backdrop-blur transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
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
            {owned.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No projects yet"
                description="Projects you create will appear here."
              />
            ) : (
              <ul className="mt-2 flex flex-col gap-0.5">
                {owned.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={onRename}
                    onDelete={onDelete}
                  />
                ))}
              </ul>
            )}
          </TabsContent>
          <TabsContent value="shared" className="flex flex-col">
            {shared.length === 0 ? (
              <EmptyState
                icon={Users}
                title="Nothing shared with you"
                description="Projects others share with you will appear here."
              />
            ) : (
              <ul className="mt-2 flex flex-col gap-0.5">
                {shared.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={onRename}
                    onDelete={onDelete}
                  />
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        <div className="shrink-0 border-t border-surface-border p-3">
          <Button className="w-full" onClick={onCreate}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
