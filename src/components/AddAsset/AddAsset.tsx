import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


interface AssetData {
  assetName: string;
  symbol: string;
  type: string;
  purchasePrice: number;
  quantity: number;
  dateOfPurchase: string | null;
  notes?: string;
}

interface AddAssetProps {
  initialData?: AssetData;
  onSubmit: (values: AssetData) => void;
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

const AddAsset: FC<AddAssetProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        assetName: initialData?.assetName || "",
        symbol: initialData?.symbol || "",
        type: initialData?.type || "",
        purchasePrice: initialData?.purchasePrice || 0,
        quantity: initialData?.quantity || 0,
        dateOfPurchase: initialData?.dateOfPurchase || null,
        notes: initialData?.notes || "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
                  <Label>Quantity</Label>
                  <Field as={Input} type="number" name="quantity" />
                  {touched.quantity && typeof errors.quantity === "string" && (
                    <p className="text-red-500 text-sm">{errors.quantity}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Date of Purchase</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {values.dateOfPurchase ? format(new Date(values.dateOfPurchase), "PPP") : "Select Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={values.dateOfPurchase ? new Date(values.dateOfPurchase) : undefined}
                      onSelect={(date) => setFieldValue("dateOfPurchase", date ? date.toISOString() : null)}
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
                <Button variant="outline" type="button">
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