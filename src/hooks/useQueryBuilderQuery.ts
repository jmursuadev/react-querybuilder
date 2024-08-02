import { QueryBuilderQueryContext } from '@/contexts/qb-query';
import { useContext } from 'react';

const useQueryBuilderQuery = () => {
  const context = useContext(QueryBuilderQueryContext);

  if (!context) {
    throw new Error('useQueryBuilderQuery must be used within a QueryBuilderQueryProvider');
  }

  return context;
};

export { useQueryBuilderQuery };
