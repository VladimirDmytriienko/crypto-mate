import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  image: string
  market_cap: number
  total_volume: number
  circulating_supply: number
  total_supply: number
  high_24h: number
  low_24h: number
}

async function fetchCryptoData(page: number): Promise<CryptoData[]> {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
  )
  if (!response.ok) throw new Error('Failed to fetch')
  return response.json()
}

const CoinGecko = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useQuery<CryptoData[], Error>({
    queryKey: ['cryptoData', page],
    queryFn: () => fetchCryptoData(page),
    staleTime: 1000 * 60 * 5,

  })

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    return num.toLocaleString()
  }

  const getBadgeVariant = (value: number) => {
    return value >= 0 ? 'default' : 'destructive'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Top Cryptocurrencies</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(old => old + 1)}
            disabled={!data || data.length < 10}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[100px] w-full rounded-lg" />
          ))
        )}

        {isError && (
          <Card className="p-4 text-red-500">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </Card>
        )}

        {data?.map((crypto: CryptoData) => (
          <Card key={crypto.id} className="p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={crypto.image} alt={crypto.name} />
              </Avatar>

              <div className="flex-1">
                <div className="font-medium text-lg">{crypto.name}</div>
                <div className="text-sm text-gray-500 uppercase">{crypto.symbol}</div>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold">${crypto.current_price.toFixed(2)}</div>
                <Badge
                  variant={getBadgeVariant(crypto.price_change_percentage_24h)}
                  className="mt-1"
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Market Cap</div>
                <div className="font-medium">${formatNumber(crypto.market_cap)}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-500">24h Volume</div>
                <div className="font-medium">${formatNumber(crypto.total_volume)}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-500">Circulating Supply</div>
                <div className="font-medium">{formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-500">24h Range</div>
                <div className="font-medium">
                  ${crypto.low_24h.toFixed(2)} - ${crypto.high_24h.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="flex items-center px-4 font-medium">Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage(old => old + 1)}
          disabled={!data || data.length < 10}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default CoinGecko