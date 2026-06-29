import { useMemo } from 'react';

export const useCardData = (data, isLoading) => {
  const cultureCards = useMemo(() => data?.layout_data?.items || [], [data]);
  const title = data?.title || "";
  const description = data?.description || "";
  
  return {
    cultureCards,
    title,
    description,
    isLoading: isLoading || (!data && !cultureCards.length)
  };
};
