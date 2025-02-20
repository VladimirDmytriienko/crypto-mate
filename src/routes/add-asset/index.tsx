import { createFileRoute } from '@tanstack/react-router'
import AddAsset from '../../components/AddAsset/AddAsset'

export const Route = createFileRoute('/add-asset/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <><AddAsset /></>
}
