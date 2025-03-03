import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from '../ui/skeleton';

interface FearGreedData {
  value: string;
  value_classification: string;
  timestamp: string;
}

const FearGreedIndex = () => {
  const { data, isLoading, isError } = useQuery<FearGreedData>({
    queryKey: ["fear-greed"],
    queryFn: async () => {
      const res = await fetch("https://api.alternative.me/fng/?limit=1");
      const json = await res.json();
      return json.data[0];
    },
    staleTime: 1000 * 60 * 30,
  });
  console.log(data);

  const getStatusColor = (value: number) => {
    if (value <= 25) return "#ef4444";
    if (value <= 45) return "#f97316";
    if (value <= 55) return "#eab308";
    if (value <= 75) return "#84cc16";
    return "#22c55e";
  };

  const percentage = data ? Number(data.value) : 0;
  const radius = 40;
  const circumference = Math.PI * radius;
  const filledLength = (percentage / 100) * circumference;

  return (
    <Card className="p-6 text-center w-full max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Fear & Greed Index</h3>
      <p className="text-sm text-gray-500 italic mb-4">
        "Buy when there's fear, sell when there's greed."
      </p>

      {isLoading && <div className="text-gray-500"><Skeleton className="h-[125px] w-[100] rounded-xl" /></div>}

      {isError && <div className="text-red-500">Error loading data</div>}

      {data && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-3xl font-bold">{data.value}</div>
            <div
              className="px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: getStatusColor(Number(data.value)) }}
            >
              {data.value_classification}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <svg
              className="w-full max-w-lg"
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
            >
              <path
                d="M10,50 A40,40 0 0,1 90,50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="6"
              />
              <path
                d="M10,50 A40,40 0 0,1 90,50"
                fill="none"
                stroke={getStatusColor(percentage)}
                strokeWidth="6"
                strokeDasharray={`${filledLength},${circumference}`}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="text-sm text-gray-500">
            Last update:{" "}
            {new Date(Number(data.timestamp) * 1000).toLocaleDateString()}{" "}
            {new Date(Number(data.timestamp) * 1000).toLocaleTimeString()}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FearGreedIndex;
