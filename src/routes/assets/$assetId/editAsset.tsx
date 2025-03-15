import { createFileRoute } from '@tanstack/react-router'
import EditForm from './-components/EditForm'

export const Route = createFileRoute('/assets/$assetId/editAsset')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><EditForm /></div>
}
