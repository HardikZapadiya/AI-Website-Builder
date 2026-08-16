import { useState, useRef, useEffect, useId } from "react";
import { CloudUploadIcon, MicIcon, Loader, ArrowRightIcon } from "lucide-react";

function PromptInput({
  onSubmit,
  loading = false,
  placeholder = "Describe the website you want to build...",
  large = false,
  autoFocus = false,
  variant = "default",
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const fileInputId = useId();

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-grow the textarea as the user types
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [value]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isGlass = variant === "glass";

  const textareaClasses = isGlass
    ? "w-full p-4 pb-2 resize-none placeholder:text-white/60 outline-none bg-transparent text-white text-base"
    : `flex-1 bg-transparent border-none outline-none resize-none text-zinc-900 placeholder:text-zinc-400 
    ${large ? "text-base" : "text-sm"}`;

  const submitBtnSize = large ? 36 : 24;
  const submitIconSize = large ? 20 : 15;

  const submitButton = (
    <button
      type={isGlass ? "submit" : "button"}
      onClick={isGlass ? undefined : () => handleSubmit()}
      disabled={!value.trim() || loading}
      className={
        isGlass
          ? "flex items-center justify-center p-1 text-white/50 hover:text-white  cursor-pointer"
          : `inline-flex items-center justify-center bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-40 cursor-pointer rounded-full shrink-0`
      }
      style={
        isGlass ? undefined : { width: submitBtnSize, height: submitBtnSize }
      }
    >
      {loading ? (
        <Loader size={isGlass ? 18 : submitIconSize} className="animate-spin" />
      ) : (
        <ArrowRightIcon size={isGlass ? 18 : submitIconSize} />
      )}
    </button>
  );

  const textarea = (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={loading}
      rows={isGlass ? 3 : large ? 5 : 1}
      className={textareaClasses}
    />
  );

  if (isGlass) {
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-xl ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-white/30 overflow-hidden mt-6 transition"
      >
        {textarea}
        <div className="flex items-center justify-between pb-3 px-4 gap-2">
          <label
            htmlFor={fileInputId}
            className="border border-white/20 text-white/80 hover:text-white p-1.5 rounded-md cursor-pointer flex items-center justify-center transition-colors"
          >
            <input type="file" id={fileInputId} hidden />
            <CloudUploadIcon size={18} />
          </label>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="flex items-center justify-center p-1 text-white/70 hover:text-white cursor-pointer"
            >
              <MicIcon size={18} />
            </button>
            {submitButton}
          </div>
        </div>
      </form>
    );
  }

  return (
    <div
      className={`bg-white border border-zinc-200 rounded-xl flex items-end gap-2 focus-within:ring-1 focus-within:ring-zinc-300 transition 
        ${large ? "p-4" : "p-3"}`}
    >
      {textarea}
      {submitButton}
    </div>
  );
}

export default PromptInput;
