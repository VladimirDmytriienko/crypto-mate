import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../config/supabase/supabase';
import { useAuthQuery } from '@/hooks/useAuthQuery';
import { AssetData, getAssets } from '@/services/assetsService';

interface ExpTableRow {
  created_at: string;
  name: string;
  ball: boolean;
  comment: string;
}

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

const fetchExpTable = async (): Promise<ExpTableRow[]> => {
  const { data, error } = await supabase
    .from('expTable')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }
  return data as ExpTableRow[]
};

function RouteComponent() {
  const { data, error, isLoading } = useQuery<ExpTableRow[]>({
    queryKey: ['expTable'],
    queryFn: fetchExpTable,
  });
  const { user } = useAuthQuery()
  const { data: assetsQuery, isLoading: assetsLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
  });

  if (isLoading || assetsLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div className='text-sky-400'>
      About:
      {data[0]?.comment}

      Email: {user?.email}
      assets: {assetsQuery?.map((assets: AssetData) =>
        <p> {assets?.assetName}, {assets?.notes}, {assets?.quantity}, {assets?.purchasePrice}, {assets?.dateOfPurchase}</p>

      )}
    </div>
  );
}