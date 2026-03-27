import React, { useRef } from 'react';

export type FileUploadState = 'default' | 'hover' | 'uploading' | 'uploaded' | 'error' | 'disabled';

export interface FileUploadProps {
  state?: FileUploadState;
  accept?: string;
  multiple?: boolean;
  fileName?: string;
  progress?: number;
  errorMessage?: string;
  onFileSelect?: (files: FileList) => void;
}

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export function FileUpload({
  state = 'default',
  accept,
  multiple = false,
  fileName,
  progress = 0,
  errorMessage = 'Upload failed. Please try again.',
  onFileSelect,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const isUploaded = state === 'uploaded';
  const isUploading = state === 'uploading';
  const isDragging = state === 'hover';

  const borderClass = isError
    ? 'border-[var(--border-error)] bg-[var(--bg-error)]'
    : isUploaded
      ? 'border-[var(--border-success)] bg-[var(--bg-success)]'
      : isDragging
        ? 'border-[var(--button-primary)] bg-[var(--bg-primary)]'
        : 'border-[var(--border-default)] bg-[var(--bg-surface)]';

  const iconClass = isError
    ? 'text-[var(--text-error)]'
    : isUploaded
      ? 'text-[var(--text-success)]'
      : isDragging
        ? 'text-[var(--text-primary)]'
        : 'text-[var(--icon-base)]';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !isDisabled && inputRef.current?.click()}
        className={[
          'flex flex-col items-center justify-center gap-3 rounded border-2 border-dashed p-8 transition-colors cursor-pointer',
          borderClass,
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--button-primary)] hover:bg-[var(--bg-primary)]',
        ].join(' ')}
      >
        <span className={iconClass}>
          {isUploaded ? <CheckIcon /> : <UploadIcon />}
        </span>

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <p className="text-sm text-[var(--text-secondary)]">Uploading {fileName}…</p>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-disabled)]">
              <div className="h-full rounded-full bg-[var(--button-primary)] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{progress}%</p>
          </div>
        ) : isUploaded ? (
          <p className="text-sm font-medium text-[var(--text-success)]">{fileName ?? 'File uploaded successfully'}</p>
        ) : isError ? (
          <p className="text-sm text-[var(--text-error)]">{errorMessage}</p>
        ) : (
          <>
            <p className="text-sm font-medium text-[var(--text-bold)]">
              {isDragging ? 'Drop file here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              {accept ? `Accepted: ${accept}` : 'Any file type'}
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={isDisabled}
        aria-label={multiple ? 'Upload files' : 'Upload file'}
        className="sr-only"
        onChange={(e) => e.target.files && onFileSelect?.(e.target.files)}
      />
    </div>
  );
}
