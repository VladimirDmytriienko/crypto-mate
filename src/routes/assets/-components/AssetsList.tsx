import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';
import { getAssets, deleteAsset } from '@/services/assetsService';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { PaginationControls } from '@/components/PaginationControls/PaginationControls'

export const AssetsList = () => {

  const [page, setPage] = useState(1);
  const [selectedNotes, setSelectedNotes] = useState<null | string>(null)

  const { data, refetch } = useQuery({
    queryKey: ['assets', page],
    queryFn: () => getAssets(page)

  });

  const assets = data?.data ?? []
  const totalPages = data?.totalPages ?? 0

  const delAsset = useMutation({
    mutationFn: (id: number) => deleteAsset(id),
    onSuccess: () => {
      refetch()
      toast.success('Asset deleted successfully')
    },
    onError: () => {
      toast.error('Error deleting asset');
    },
  })

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage)
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Assets List</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort by: <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* {["assetName", "symbol", "purchasePrice", "dateOfPurchase"].map((field) => (
              <DropdownMenuItem key={field} onClick={() => toggleSortOrder(field)}>
                {field} {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </DropdownMenuItem>
            ))} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date of Purchase</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets?.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.assetName}</TableCell>
              <TableCell>{asset.symbol}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>${asset.purchasePrice}</TableCell>
              <TableCell>{asset.quantity}</TableCell>
              <TableCell>
                {asset.dateOfPurchase ? new Date(asset.dateOfPurchase).toLocaleDateString() : "N/A"}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link to={`/assets/${asset.id}/editAsset`}>
                      <DropdownMenuItem >
                        Edit

                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => delAsset.mutate(asset.id)}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedNotes(asset.notes ?? null)}>View Notes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControls page={page} totalPages={totalPages} onPageChange={handlePageChange} />

      <Dialog open={!!selectedNotes} onOpenChange={() => setSelectedNotes(null)}>
        <DialogContent>
          <DialogTitle>Notes </DialogTitle>
          <p>{selectedNotes}</p>
        </DialogContent>
      </Dialog>
    </Card >
  )
}