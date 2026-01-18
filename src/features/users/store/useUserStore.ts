import { useAppContainer } from '../../../di/AppContainer';

export const useUserStore = () => {
  const { useUserStore } = useAppContainer();
  return useUserStore();
};