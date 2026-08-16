import { homeTags } from "../../assets/assets";

const ScrollingTags = ({ handleGenerate, generatingProject }) => {
  return (
    <div className=" masked-marquee w-full mt-4 max-w-2xl overflow-hidden py-1">
      <div className="animate-marquee flex item-center w-max gap-3">
        {[...homeTags, ...homeTags].map((tag, i) => (
          <button
            key={i}
            onClick={() => {
              handleGenerate(tag);
            }}
            disabled={generatingProject}
            className="px-4 py-1.5 border rounded-full text-sm text-white bg-white/10 border-white/25 hover:bg-white/20 transition cursor-pointer shrink-0 font-medium"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTags;
