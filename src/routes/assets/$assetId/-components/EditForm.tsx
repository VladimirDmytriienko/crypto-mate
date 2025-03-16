import AddAsset from '@/components/AddAsset/AddAsset';
import { getAssets } from '@/services/assetsService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';



const EditForm = () => {
  const { assetId } = useParams({ strict: false })
  const { data: assetsQuery, isLoading: assetsLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: () => getAssets(assetId),
  });

  return (
    <>
      {assetsLoading ? 'loading' : ''}
      <AddAsset initialData={assetsQuery?.[0]} />
    </>
  )
}

export default EditForm