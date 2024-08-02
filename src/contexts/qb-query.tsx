import { QueryBuilderQueryContextType } from '@/types';
import { createContext, useState } from 'react';
import { generateID, RuleGroupTypeIC } from 'react-querybuilder';

const QueryBuilderQueryContext = createContext<QueryBuilderQueryContextType | null>(null);

// default value for group query
const defaultGroupQuery = (): RuleGroupTypeIC => {
  return {
    id: generateID(),
    rules: [],
  };
};

const initialQuery: RuleGroupTypeIC = {
  id: generateID(),
  rules: [defaultGroupQuery()],
};

const QueryBuilderQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<RuleGroupTypeIC>(initialQuery);

  return <QueryBuilderQueryContext.Provider value={{ query, setQuery }}>{children}</QueryBuilderQueryContext.Provider>;
};

export { QueryBuilderQueryContext, QueryBuilderQueryProvider, defaultGroupQuery, initialQuery };
