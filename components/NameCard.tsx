import { NameRecommendation } from "@/types";

interface NameCardProps {
  name: NameRecommendation;
}

export default function NameCard({ name }: NameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-ink/5 p-6 hover:shadow-md transition">
      <div className="text-center mb-4">
        <h3 className="text-3xl font-serif font-bold text-ink tracking-wide">
          {name.fullName}
        </h3>
        <p className="text-ink/50 text-sm mt-1">{name.pinyin}</p>
      </div>

      <div className="border-t border-ink/10 pt-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-vermillion uppercase tracking-wider mb-1">
            Poetry Source
          </p>
          <p className="text-sm text-ink/70">
            《{name.source.book}》· {name.source.chapter}
          </p>
          <p className="text-xs text-ink/40 italic">
            {name.source.bookEn} · {name.source.chapterEn}
          </p>
          <blockquote className="mt-2 pl-3 border-l-2 border-vermillion/30">
            <p className="text-sm text-ink/80">{name.source.originalText}</p>
            <p className="text-xs text-ink/40 mt-1 italic">
              {name.source.translation}
            </p>
          </blockquote>
        </div>

        <div>
          <p className="text-xs font-medium text-vermillion uppercase tracking-wider mb-1">
            Meaning
          </p>
          <p className="text-sm text-ink/70">{name.meaning}</p>
          <p className="text-xs text-ink/40 mt-1 italic">{name.meaningEn}</p>
        </div>
      </div>
    </div>
  );
}
