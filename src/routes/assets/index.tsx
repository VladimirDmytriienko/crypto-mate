import { createFileRoute } from '@tanstack/react-router'
import { AssetsList } from './-components/AssetsList'

export const Route = createFileRoute('/assets/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <AssetsList />
  </div>
}
