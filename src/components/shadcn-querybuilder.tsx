import { QueryBuilderShadCN } from '@/contexts/qb-shadcn-context';
import { useEffect, useState } from 'react';
import QueryBuilder, { add, formatQuery, generateID, RuleGroupTypeIC } from 'react-querybuilder';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import fields from '@/data/fields';
import { Button } from '@ui';
import { PlusIcon } from '@radix-ui/react-icons';
import 'react-querybuilder/dist/query-builder.scss';
import { formatQueryToPostgrest } from '@/lib/utils/formatQueryToPostgrest';
import { useQueryBuilderQuery } from '@/hooks/useQueryBuilderQuery';
import { defaultGroupQuery, initialQuery } from '@/contexts/qb-query';

type ShadCNQueryBuilderProps = {
  onApply: () => void;
};

const ShadCNQueryBuilder = ({ onApply }: ShadCNQueryBuilderProps) => {
  const { query, setQuery } = useQueryBuilderQuery();

  const handleAddGroup = () => {
    setQuery(add(query, defaultGroupQuery(), []));
  };

  const handleClearQuery = () => {
    setQuery(initialQuery);
  };

  return (
    <QueryBuilderShadCN>
      <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
        <div className="w-full">
          <QueryBuilder query={query} onQueryChange={setQuery} showCombinatorsBetweenRules fields={fields()} />
          <div className="flex justify-between">
            <div>
              <Button variant="ghost" onClick={handleAddGroup}>
                <PlusIcon /> Group
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleClearQuery}>
                Clear all
              </Button>
              <Button onClick={() => onApply()}>Save as</Button>
            </div>
          </div>
        </div>
      </QueryBuilderDnD>
    </QueryBuilderShadCN>
  );
};

export { ShadCNQueryBuilder };
