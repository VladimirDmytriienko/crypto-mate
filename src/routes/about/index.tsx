import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../config/supabase/supabase';
import { useAuthQuery } from '@/hooks/useAuthQuery';

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


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div className='text-sky-400'>
      About:
      {data[0]?.comment}

      Email: {user?.email}

    </div>
  );
}