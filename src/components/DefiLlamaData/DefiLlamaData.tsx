import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface Protocol {
  id: string;
  name: string;
  logo: string;
  tvl: number;
  change_1d: number;
  change_7d: number;
  fees_24h: number;
  revenue_24h: number;
  category: string;
  chains: string[];
}


const ITEMS_PER_PAGE = 30;

const fetchDefiLlamaData = async () => {
  const response = await fetch('https://api.llama.fi/protocols');
  if (!response.ok) throw new Error('Failed to fetch DeFi protocols');
  return response.json();
};

const formatNumber = (num: number) => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(3)}b`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}m`;
  return num.toLocaleString();
};
const DefiLlamaData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['defiLlamaData'],
    queryFn: fetchDefiLlamaData,
  });

  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(8).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= 5) {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) pages.push(1, '...');
      pages.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
      if (endPage < totalPages) pages.push('...', totalPages);
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious

              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((p) => Math.max(1, p - 1));
              }}

            />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === 'number' ? (
                <PaginationLink

                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((p) => Math.min(totalPages, p + 1));
              }}

            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  if (isError) return <div className="text-red-500">Error loading data</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Protocol Rankings</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>TVL</TableHead>
            <TableHead>1d Change</TableHead>
            <TableHead>7d Change</TableHead>
            <TableHead>Fees & Revenue</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((protocol: Protocol) => (
            <TableRow key={protocol.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={protocol.logo} />
                </Avatar>
                <span>{protocol.name}</span>
                <Badge variant="outline" className="ml-2">
                  {protocol.chains?.length || 1} chains
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {protocol.category || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell>
                ${formatNumber(protocol.tvl || 0)}
                <div className="text-xs text-muted-foreground">
                  {protocol.change_1d?.toFixed(2)}%
                </div>
              </TableCell>
              <TableCell className={protocol.change_1d >= 0 ? 'text-green-500' : 'text-red-500'}>
                {protocol.change_1d?.toFixed(2)}%
              </TableCell>
              <TableCell className={protocol.change_7d >= 0 ? 'text-green-500' : 'text-red-500'}>
                {protocol.change_7d?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {protocol.fees_24h ? `$${formatNumber(protocol.fees_24h)}` : 'N/A'}
              </TableCell>
              <TableCell>
                {protocol.revenue_24h ? `$${formatNumber(protocol.revenue_24h)}` : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {renderPagination()}
    </div>
  );
};

export default DefiLlamaData;
