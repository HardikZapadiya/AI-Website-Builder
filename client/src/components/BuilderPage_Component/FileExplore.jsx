import { useMemo } from "react";
import {
  FolderOpenIcon,
  FileCode2Icon,
  FileJsonIcon,
  FileTextIcon,
  FileIcon,
} from "lucide-react";

function buildTree(filePaths) {
  const root = [];

  filePaths.forEach((filePath) => {
    const parts = filePath.split("/").filter(Boolean);
    let current = root;

    parts.forEach((name, index) => {
      const isLast = index === parts.length - 1;
      const fullPath = "/" + parts.slice(0, index + 1).join("/");
      let existing = current.find((node) => node.name === name);
 
      if (!existing) {
        existing = {
          name,
          path: fullPath,
          isDir: !isLast,
          children: [],
        };
        current.push(existing);
      }

      current = existing.children;
    });
  });

  return root;
}

function getFileIcon(name) {
  const lowerName = name.toLowerCase();

  if (lowerName.endsWith(".css") || lowerName.endsWith(".md")) {
    return <FileTextIcon size={14} className="text-sky-500" />;
  }

  if (
    lowerName.endsWith(".js") ||
    lowerName.endsWith(".jsx") ||
    lowerName.endsWith(".ts") ||
    lowerName.endsWith(".tsx")
  ) {
    return <FileCode2Icon size={14} className="text-violet-500" />;
  }

  if (lowerName.endsWith(".json")) {
    return <FileJsonIcon size={14} className="text-emerald-500" />;
  }

  return <FileIcon size={14} className="text-zinc-400" />;
}

function TreeItem({ node, activeFile, onFileSelect, depth = 0 }) {
  const isActive = node.path === activeFile;

  if (node.isDir) {
    return (
      <div>
        <div className="flex items-center gap-2 py-1 px-2 text-xs text-zinc-400 select-none">
          <FolderOpenIcon size={14} className="text-zinc-700" />
          <span>{node.name}</span>
        </div>
        <div>
          {node.children.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              activeFile={activeFile}
              onFileSelect={onFileSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onFileSelect(node.path)}
      className={`w-full flex items-center gap-2 py-1.5 px-2 text-xs transition-colors rounded-md cursor-pointer ${
        isActive
          ? "bg-zinc-100 text-zinc-950 font-medium"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      {getFileIcon(node.name)}
      <span className="truncate">{node.name}</span>
    </button>
  );
}

function FileExplore({ files, activeFile, onFileSelect }) {
  const tree = useMemo(() => buildTree(Object.keys(files ?? {})), [files]);

  return (
    <div className="py-2 overflow-y-auto hide-scrollbar">
      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        Files
      </p>
      <div className="px-1">
        {tree.map((node) => (
          <TreeItem
            key={node.path}
            node={node}
            activeFile={activeFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default FileExplore;
