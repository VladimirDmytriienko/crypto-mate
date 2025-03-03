import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AvatarImage } from '@radix-ui/react-avatar'

const fetchTokenProfiles = async () => {
  const response = await fetch('https://api.dexscreener.com/token-profiles/latest/v1')
  if (!response.ok) throw new Error('Failed to fetch')
  return response.json()
}

const DexTokenProfiles = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tokenProfiles'],
    queryFn: fetchTokenProfiles,
    staleTime: 1000 * 60 * 5,
  })
  console.log(data);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">DEX Token Profiles</h2>
        <Button onClick={() => refetch()} variant="outline">Refresh</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
        ))}

        {isError && (
          <Card className="p-4 border border-red-500 bg-red-50">
            <CardContent>Error: {error instanceof Error ? error.message : 'Unknown error'}</CardContent>
          </Card>
        )}

        {data?.map((token: any) => (  //! LATER ADD TYPE
          <Card key={token?.tokenAddress} className="p-4 flex flex-col gap-4 hover:shadow-lg transition-shadow rounded-xl">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage className="h-14 w-14" src={token?.icon} alt={token?.tokenAddress} />
              </Avatar>

              <div>
                {/* 
                 */}
                <Badge variant="secondary" className="text-xs uppercase">{token?.chainId}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* {token.description && <p className="text-sm text-gray-600">{token.description}</p>} */}
              {/* <div className="mt-3">
                <a href={token.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View on DexScreener
                </a>
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DexTokenProfiles
