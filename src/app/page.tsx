'use client';

import { DynamicTable } from '@ui/table';
import { ClientOnly } from './ClientOnly';
import { ShadCNQueryBuilder } from '@components/shadcn-querybuilder';
import { TableField } from '@/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchUsers } from '@/api/user';
import { useQueryBuilderQuery } from '@/hooks/useQueryBuilderQuery';
import { QueryBuilderQueryContext } from '@/contexts/qb-query';
import { formatQueryToPostgrest } from '@/lib/utils/formatQueryToPostgrest';

// create fields with following format Name, Email, Distinct ID, Updated at, Country Code, Region, City
const fields = [
  { label: 'First Name', name: 'first_name' },
  { label: 'Last Name', name: 'last_name' },
  { label: 'age', name: 'age' },
  { label: 'instrument', name: 'instrument' },
  { label: 'Also Plays', name: 'also_plays' },
] satisfies TableField[];

// generate dummy data for table with 10 rows
const sampleData = Array.from({ length: 10 }, (_, i) => ({
  name: `Name ${i}`,
  email: `Email ${i}`,
  distinct_id: `Distinct ID ${i}`,
  updated_at: `Updated at ${i}`,
  country_code: `Country Code ${i}`,
  region: `Region ${i}`,
  city: `City ${i}`,
}));

export default function Home() {
  const { query } = useQueryBuilderQuery();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers().then(response => {
      setData(response);
    });
  }, []);

  const handleApply = useCallback(() => {
    const params = formatQueryToPostgrest(query);
    fetchUsers(params).then(response => {
      setData(response);
    });
  }, [query]);

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24">
      <ClientOnly>
        <ShadCNQueryBuilder onApply={handleApply} />
      </ClientOnly>
      <DynamicTable classNameWrapper="max-h-[600px]" fields={fields} data={data} />
    </main>
  );
}
