"use client";

import { useState } from "react";

import { MOCK_PROJECTS } from "@/lib/mock-projects";
import { slugify } from "@/lib/slugify";
import type { Project } from "@/types/project";

export type ProjectDialogType = "create" | "rename" | "delete";

interface DialogState {
  type: ProjectDialogType;
  project: Project | null;
}

const MOCK_LATENCY_MS = 400;

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = slugify(name);
  const canSubmit = dialog?.type === "delete" || slug.length > 0;

  function openCreate() {
    setName("");
    setDialog({ type: "create", project: null });
  }

  function openRename(project: Project) {
    setName(project.name);
    setDialog({ type: "rename", project });
  }

  function openDelete(project: Project) {
    setDialog({ type: "delete", project });
  }

  function close() {
    if (isLoading) return;
    setDialog(null);
  }

  async function submit() {
    if (!dialog || !canSubmit || isLoading) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const trimmed = name.trim();
    if (dialog.type === "create") {
      setProjects((current) => [
        { id: crypto.randomUUID(), name: trimmed, slug, isOwner: true },
        ...current,
      ]);
    } else if (dialog.type === "rename" && dialog.project) {
      const { id } = dialog.project;
      setProjects((current) =>
        current.map((p) => (p.id === id ? { ...p, name: trimmed, slug } : p)),
      );
    } else if (dialog.type === "delete" && dialog.project) {
      const { id } = dialog.project;
      setProjects((current) => current.filter((p) => p.id !== id));
    }

    setIsLoading(false);
    setDialog(null);
  }

  return {
    projects,
    dialog,
    name,
    setName,
    slug,
    canSubmit,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    submit,
  };
}

export type ProjectDialogsController = ReturnType<typeof useProjectDialogs>;
