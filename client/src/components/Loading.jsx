import { Loader } from "lucide-react";

function Loading() {
  return (
    <div
      role="status"
      arial-label="Loading"
      className="h-screen flex items-center justify-center bg-white"
    >
      <Loader size={26} className="animate-spin text-zinc-950" />
    </div>
  );
}

export default Loading;
