import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../config/supabase/supabase';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

const fetchExpTable = async () => {
  const { data, error } = await supabase
    .from('expTable')
    .select('')

  if (error) {
    throw new Error(error.message)
  }
  return data
}

function RouteComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['expTable'],
    queryFn: fetchExpTable,
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      About:
      {data[0]?.comment}
    </div>
  )
}
