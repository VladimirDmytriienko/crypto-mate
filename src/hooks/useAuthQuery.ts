import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSession, getUser, signIn, signOut, signUp } from '../services/authService'


export const useAuthQuery = () => {
  const queryClient = useQueryClient();

  const sessionQuery = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    staleTime: Infinity,
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!sessionQuery.data,
    staleTime: Infinity,
  });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    session: sessionQuery.data,
    user: userQuery.data,
    isLoading: sessionQuery.isLoading || userQuery.isLoading,
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    signOut: signOutMutation.mutate,
  };
};