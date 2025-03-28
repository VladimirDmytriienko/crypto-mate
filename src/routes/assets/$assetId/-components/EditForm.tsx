import AddAsset from '@/components/AddAsset/AddAsset';
import { getAssetById } from '@/services/assetsService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';



const EditForm = () => {
  const { assetId } = useParams({ strict: false })
  const { data: asset, isLoading: assetsLoading } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => getAssetById(+assetId),
    enabled: !!assetId,
  });

  return (
    <>
      {assetsLoading ? 'loading' : ''}
      <AddAsset initialData={asset} />
    </>
  )
}

export default EditForm