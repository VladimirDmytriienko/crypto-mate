import { useQuery } from '@tanstack/react-query'
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FearGreedData {
  value: string
  value_classification: string
  timestamp: string
}

const FearGreedIndex = () => {
  const { data, isLoading, isError } = useQuery<FearGreedData>({
    queryKey: ['fear-greed'],
    queryFn: async () => {
      const res = await fetch('https://api.alternative.me/fng/?limit=1')
      const json = await res.json()
      return json.data[0]
    },
    staleTime: 1000 * 60 * 30 // 30 минут
  })

  const getStatusColor = (value: number) => {
    if (value <= 25) return 'bg-red-500'
    if (value <= 45) return 'bg-orange-500'
    if (value <= 55) return 'bg-yellow-500'
    if (value <= 75) return 'bg-lime-500'
    return 'bg-green-500'
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Fear & Greed Index</h3>

      {isLoading && <Progress value={0} className="h-2" />}

      {isError && (
        <div className="text-red-500">Error loading data</div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{data.value}</div>
            <div className={`px-3 py-1 rounded-full ${getStatusColor(Number(data.value))} text-white`}>
              {data.value_classification}
            </div>
          </div>

          <Progress
            value={Number(data.value)}
            className={`h-3 bg-gray-200 [&>div]:${getStatusColor(Number(data.value))}`}
          />

          <div className="text-sm text-gray-500">
            Last update: {new Date(Number(data.timestamp) * 1000).toLocaleDateString()}
          </div>
        </div>
      )}
    </Card>
  )
}

export default FearGreedIndex