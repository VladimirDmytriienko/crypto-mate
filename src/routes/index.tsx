import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CoinGecko from "@/components/CoinGecko/CoinGecko"
import FearGreedIndex from "@/components/FearGreedIndex/FearGreedIndex"
import { createFileRoute } from "@tanstack/react-router"
import DefiLlamaData from '@/components/DefiLlamaData/DefiLlamaData'

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="block md:hidden w-full">
        <Tabs defaultValue="feargreed" className="w-full p-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="coingecko">CoinGecko</TabsTrigger>
            <TabsTrigger value="dexscreener">Defi Llama</TabsTrigger>
            <TabsTrigger value="feargreed">Fear & Greed</TabsTrigger>
          </TabsList>
          <TabsContent value="coingecko">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <CoinGecko />
            </div>
          </TabsContent>
          <TabsContent value="dexscreener">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <DefiLlamaData />
            </div>
          </TabsContent>
          <TabsContent value="feargreed">
            <div className="bg-white rounded-md p-4 shadow-sm w-full">
              <FearGreedIndex />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden md:grid grid-cols-3 gap-4 px-4">
        <div className="bg-white rounded-md p-4 shadow-sm">
          <CoinGecko />
        </div>
        <div className="bg-white rounded-md p-4 shadow-sm">
          <DefiLlamaData />
        </div>
        <div className="bg-white rounded-md p-4 shadow-sm">
          <FearGreedIndex />
        </div>
      </div>
    </>
  )
}
