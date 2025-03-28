import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addAsset, AssetDataBase, updateAsset } from '@/services/assetsService';
import { useMutation } from '@tanstack/react-query';
import { useAuthQuery } from '@/hooks/useAuthQuery';
import { AssetData } from '@/services/assetsService';
import { toast, } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

interface AddAssetProps {
  initialData?: AssetDataBase | null;
  onSubmit?: (values: AssetData) => void;
}

const validationSchema = Yup.object({
  assetName: Yup.string().required("Required"),
  symbol: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  purchasePrice: Yup.number().required("Required"),
  quantity: Yup.number().required("Required"),
  dateOfPurchase: Yup.string().required("Required"),
  notes: Yup.string(),
});

const AddAsset: FC<AddAssetProps> = ({ initialData, }) => {
  const { user } = useAuthQuery()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async (values: AssetDataBase | AssetData) => {
      if ('id' in values) {
        return updateAsset(values.id, values);
      }
      return addAsset(values);
    },
    onSuccess: () => {
      toast('Asset added successfully')
      navigate({ to: '/assets' })
    },
    onError: (error) => {
      console.error("Error adding asset:", error);
    },
  });

  return (
    <Formik
      initialValues={{
        ...(initialData ? { id: initialData.id } : {}),
        email: user?.email || "",
        assetName: initialData?.assetName || "",
        symbol: initialData?.symbol || "",
        type: initialData?.type || "",
        purchasePrice: initialData?.purchasePrice || 0,
        quantity: initialData?.quantity || 0,
        dateOfPurchase: initialData?.dateOfPurchase || null,
        notes: initialData?.notes || "",
        user_id: user?.id ?? "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutateAsync(values)}
    >

      {({ errors, touched, setFieldValue, values }) => (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{initialData ? "Edit Asset" : "Add Asset"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Asset Name</Label>
                  <Field as={Input} name="assetName" placeholder="E.g. Bitcoin" />
                  {touched.assetName && typeof errors.assetName === "string" && (
                    <p className="text-red-500 text-sm">{errors.assetName}</p>
                  )}
                </div>
                <div>
                  <Label>Symbol</Label>
                  <Field as={Input} name="symbol" placeholder="BTC" />
                  {touched.symbol && typeof errors.symbol === "string" && (
                    <p className="text-red-500 text-sm">{errors.symbol}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Type</Label>
                <Select onValueChange={(value) => setFieldValue("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                  </SelectContent>
                </Select>
                {touched.type && typeof errors.type === "string" && (
                  <p className="text-red-500 text-sm">{errors.type}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Purchase Price</Label>
                  <Field as={Input} type="number" name="purchasePrice" />
                  {touched.purchasePrice && typeof errors.purchasePrice === "string" && (
                    <p className="text-red-500 text-sm">{errors.purchasePrice}</p>
                  )}
                </div>
                <div>
                  <Label>Quantity </Label>
                  <Field as={Input} type="number" name="quantity" />
                  {touched.quantity && typeof errors.quantity === "string" && (
                    <p className="text-red-500 text-sm">{errors.quantity}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Date of Purchase</Label>
                <Popover >
                  <PopoverTrigger asChild>
                    <span className='flex '>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !values.dateOfPurchase && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {values.dateOfPurchase
                          ? format(new Date(values.dateOfPurchase), "PPP")
                          : "Select Date"}
                      </Button>

                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={values.dateOfPurchase ? new Date(values.dateOfPurchase) : undefined}
                      onSelect={(date) => setFieldValue("dateOfPurchase", date?.toISOString() ?? null, false)}

                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {touched.dateOfPurchase && typeof errors.dateOfPurchase === "string" && (
                  <p className="text-red-500 text-sm">{errors.dateOfPurchase}</p>
                )}
              </div>

              <div>
                <Label>Notes</Label>
                <Field as={Textarea} name="notes" placeholder="Add notes" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate({ to: '/assets' })} >
                  Cancel
                </Button>
                <Button type="submit">{initialData ? "Update" : "Save"}</Button>
              </div>
            </Form>
          </CardContent>

        </Card>

      )}

    </Formik>
  );
};

export default AddAsset;