'use client';

import { QueryBuilderQueryProvider } from '@/contexts/qb-query';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return <QueryBuilderQueryProvider>{children}</QueryBuilderQueryProvider>;
}
