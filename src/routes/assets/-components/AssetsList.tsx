import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { getAssets } from '@/services/assetsService';
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


export const AssetsList = () => {
  const { data } = useQuery({
    queryKey: ['assets'],
    queryFn: () => getAssets(),
  });
  const [selectedNotes, setSelectedNotes] = useState<null | string>(null);
  console.log(data);

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Assets List</h2>
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
          {data?.map((asset) => (
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
                    <DropdownMenuItem onClick={() => toast('Edit clicked')}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast('Delete clicked')}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedNotes(asset.notes ?? null)}>View Notes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedNotes} onOpenChange={() => setSelectedNotes(null)}>
        <DialogContent>
          <DialogTitle>Notes </DialogTitle>
          <p>{selectedNotes}</p>
        </DialogContent>
      </Dialog>
    </Card>
  )
}