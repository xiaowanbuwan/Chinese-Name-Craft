import { NameRecommendation } from "@/types";
import NameCard from "./NameCard";

interface NameCardListProps {
  names: NameRecommendation[];
  onGenerateAgain: () => void;
}

export default function NameCardList({ names, onGenerateAgain }: NameCardListProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {names.map((name, i) => (
          <NameCard key={`${name.fullName}-${i}`} name={name} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={onGenerateAgain}
          className="px-8 py-3 bg-ink text-white font-medium rounded-lg hover:bg-ink/80 transition cursor-pointer"
        >
          Generate Again
        </button>
      </div>
    </div>
  );
}
