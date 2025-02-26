import CoinGecko from '@/components/CoinGecko/CoinGecko'
import FearGreedIndex from '@/components/FearGreedIndex/FearGreedIndex'
import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-700 p-6 rounded-lg">

      <div className=" rounded-md p-4 shadow-sm">
        <CoinGecko />
      </div>

      <div className="bg-white rounded-md p-4 shadow-sm">

      </div>

      <div className="bg-white rounded-md p-4 shadow-sm">
        <FearGreedIndex />
      </div>
    </div>
  )
}
