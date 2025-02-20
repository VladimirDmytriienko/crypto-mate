import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface AddAsset {

}

const validationSchema = Yup.object({
  assetName: Yup.string().required("Required"),
  symbol: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  purchasePrice: Yup.number().required("Required"),
  quantity: Yup.number().required("Required"),
  dateOfPurchase: Yup.date().required("Required"),
  notes: Yup.string(),
});

const AddAsset: React.FC<AddAsset> = ({ }) => {
  return (
    <Formik
      initialValues={{
        assetName: "",
        symbol: "",
        type: "",
        purchasePrice: "",
        quantity: "",
        dateOfPurchase: "",
        notes: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg space-y-4">
          <h2 className="text-white text-xl font-semibold">Add Asset</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white block mb-1">Asset Name</label>
              <Field as={Input} name="assetName" placeholder="E.g. Bitcoin" className="bg-gray-800 text-white" />
              {errors.assetName && touched.assetName && <div className="text-red-500 text-sm">{errors.assetName}</div>}
            </div>
            <div>
              <label className="text-white block mb-1">Symbol</label>
              <Field as={Input} name="symbol" placeholder="BTC" className="bg-gray-800 text-white" />
              {errors.symbol && touched.symbol && <div className="text-red-500 text-sm">{errors.symbol}</div>}
            </div>
          </div>

          <div>
            <label className="text-white block mb-1">Type</label>
            <Field name="type" as={Select}>
              <SelectTrigger className="bg-gray-800 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
              </SelectContent>
            </Field>
            {errors.type && touched.type && <div className="text-red-500 text-sm">{errors.type}</div>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white block mb-1">Purchase Price</label>
              <Field as={Input} type="number" name="purchasePrice" className="bg-gray-800 text-white" />
              {errors.purchasePrice && touched.purchasePrice && <div className="text-red-500 text-sm">{errors.purchasePrice}</div>}
            </div>
            <div>
              <label className="text-white block mb-1">Quantity</label>
              <Field as={Input} type="number" name="quantity" className="bg-gray-800 text-white" />
              {errors.quantity && touched.quantity && <div className="text-red-500 text-sm">{errors.quantity}</div>}
            </div>
          </div>

          <div>
            <label className="text-white block mb-1">Date of Purchase</label>
            <Field as={Input} type="date" name="dateOfPurchase" className="bg-gray-800 text-white" />
            {errors.dateOfPurchase && touched.dateOfPurchase && <div className="text-red-500 text-sm">{errors.dateOfPurchase}</div>}
          </div>

          <div>
            <label className="text-white block mb-1">Notes</label>
            <Field as={Textarea} name="notes" placeholder="Add notes" className="bg-gray-800 text-white" />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddAsset;