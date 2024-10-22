import { useTheme } from "next-themes";
import ContentLoader from "react-content-loader";

export default function CardSkeleton() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full p-10 shadow-sm bg-white dark:bg-slate-800/50 dark:shadow-[inset_0_1px_0_1px_rgba(148,163,184,0.1)] border-none dark:drop-shadow-lg rounded-md mb-6 text-center">
      <ContentLoader
        uniqueKey="card-skeleton"
        speed={2}
        width={100}
        style={{ width: "100%" }}
        height={100}
        backgroundColor={resolvedTheme === "dark" ? "#0f172a" : "#f3f3f3"}
        foregroundColor={resolvedTheme === "dark" ? "#64748b" : "#ecebeb"}
      >
        <rect x="0" y="0" rx="5" ry="5" width="31%" height="100" />
        <rect x="34%" y="0" rx="5" ry="5" width="66%" height="30" />
        <rect x="34%" y="41" rx="2" ry="2" width="60%" height="15" />
        <rect x="34%" y="63" rx="2" ry="2" width="50%" height="15" />
        <rect x="34%" y="85" rx="2" ry="2" width="55%" height="15" />
      </ContentLoader>
    </div>
  );
}
