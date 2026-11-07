"use client";

import { useId, useState, type DragEvent } from "react";
import { uploadRules } from "@/data/content";
import { ArrowUpIcon, CloseIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { checkFiles } from "@/lib/validation";

interface FileDropProps {
  files: readonly File[];
  onChange: (next: File[]) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Attach reference files: tap or click to browse, or drop files on the box (desktop). The same
 * rules the server applies are checked here first, so a bad file is refused with a reason at once.
 */
export function FileDrop({ files, onChange }: FileDropProps) {
  const inputId = useId();
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const add = (incoming: File[]) => {
    const fresh = incoming.filter(
      (file) => !files.some((existing) => existing.name === file.name && existing.size === file.size),
    );
    if (fresh.length === 0) return;
    const next = [...files, ...fresh];
    const problem = checkFiles(next);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    onChange(next);
  };

  const remove = (index: number) => {
    setError("");
    onChange(files.filter((_, position) => position !== index));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    add(Array.from(event.dataTransfer.files));
  };

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer select-none flex-col items-center gap-3 rounded-card border border-dashed px-5 py-6 text-center transition duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-violet lg:gap-[1cqw] lg:py-[2.2cqw]",
          dragging ? "border-ink bg-ink/[0.05]" : "border-ink/40 hover:border-ink hover:bg-ink/[0.03]",
        )}
      >
        <span
          aria-hidden="true"
          className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white lg:h-[4cqw] lg:w-[4cqw]"
        >
          <ArrowUpIcon className="h-5 w-5 lg:h-[1.8cqw] lg:w-[1.8cqw]" />
        </span>
        <span className="text-sm font-medium md:text-base lg:text-[max(14px,1.3cqw)]">
          <span className="md:hidden">Tap to add files</span>
          <span className="hidden md:inline">Drop files here or browse</span>
        </span>
        <input
          id={inputId}
          type="file"
          multiple
          accept={uploadRules.extensions.join(",")}
          className="sr-only"
          onChange={(event) => {
            add(Array.from(event.target.files ?? []));
            // Lets the same file be chosen again after it was removed.
            event.target.value = "";
          }}
        />
      </label>

      <p className="mt-2 text-xs text-ink/70 lg:mt-[0.7cqw] lg:text-[max(11px,1cqw)]">{uploadRules.hint}</p>

      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2 lg:mt-[1cqw] lg:gap-[0.6cqw]">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-3 rounded-full bg-surface py-1 pl-5 pr-1 text-sm lg:pl-[1.8cqw] lg:text-[max(13px,1.2cqw)]"
            >
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-ink/70 lg:text-[max(11px,1cqw)]">{formatSize(file.size)}</span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => remove(index)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition duration-300 hover:bg-ink hover:text-white active:scale-95 lg:h-[3.4cqw] lg:w-[3.4cqw]"
              >
                <CloseIcon className="h-4 w-4 lg:h-[1.5cqw] lg:w-[1.5cqw]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p role="status" aria-live="polite" className="mt-2 text-xs text-red-700 empty:hidden lg:text-[max(11px,1cqw)]">
        {error}
      </p>
    </div>
  );
}
