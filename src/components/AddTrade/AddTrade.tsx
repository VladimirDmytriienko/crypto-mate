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

interface TradeData {
    assetName: string;
    symbol: string;
    tradeType: string;
    amount?: number;
    allocation?: number;
    date: string | null;
    notes?: string;
}

interface AddTradeProps {
    initialData?: TradeData;
    onSubmit: (values: TradeData) => void;
}

const validationSchema = Yup.object({
    assetName: Yup.string().required("Required"),
    symbol: Yup.string().required("Required"),
    tradeType: Yup.string().required("Required"),
    amount: Yup.number().when("tradeType", {
        is: (type: string) => type === "buy" || type === "sell",
        then: (schema) => schema.required("Required"),
    }),
    allocation: Yup.number().when("tradeType", {
        is: (type: string) => type === "ico" || type === "airdrop",
        then: (schema) => schema.required("Required"),
    }),
    date: Yup.string().required("Required"),
    notes: Yup.string(),
});

const AddTrade: FC<AddTradeProps> = ({ initialData, onSubmit }) => {
    return (
        <Formik
            initialValues={{
                assetName: initialData?.assetName || "",
                symbol: initialData?.symbol || "",
                tradeType: initialData?.tradeType || "",
                amount: initialData?.amount || undefined,
                allocation: initialData?.allocation || undefined,
                date: initialData?.date || null,
                notes: initialData?.notes || "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, setFieldValue, values }) => (
                <Card className="max-w-lg mx-auto">
                    <CardHeader>
                        <CardTitle>{initialData ? "Edit Trade" : "Add Trade"}</CardTitle>
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
                                <Label>Trade Type</Label>
                                <Select onValueChange={(value) => setFieldValue("tradeType", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select trade type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="buy">Buy</SelectItem>
                                        <SelectItem value="sell">Sell</SelectItem>
                                        <SelectItem value="ico">ICO Participation</SelectItem>
                                        <SelectItem value="airdrop">Airdrop</SelectItem>
                                        <SelectItem value="otc">OTC Trade</SelectItem>
                                    </SelectContent>
                                </Select>
                                {touched.tradeType && typeof errors.tradeType === "string" && (
                                    <p className="text-red-500 text-sm">{errors.tradeType}</p>
                                )}
                            </div>

                            {(values.tradeType === "buy" || values.tradeType === "sell") && (
                                <div>
                                    <Label>Amount</Label>
                                    <Field as={Input} type="number" name="amount" />
                                    {touched.amount && typeof errors.amount === "string" && (
                                        <p className="text-red-500 text-sm">{errors.amount}</p>
                                    )}
                                </div>
                            )}

                            {(values.tradeType === "ico" || values.tradeType === "airdrop") && (
                                <div>
                                    <Label>Allocation</Label>
                                    <Field as={Input} type="number" name="allocation" />
                                    {touched.allocation && typeof errors.allocation === "string" && (
                                        <p className="text-red-500 text-sm">{errors.allocation}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <Label>Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            {values.date ? format(new Date(values.date), "PPP") : "Select Date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={values.date ? new Date(values.date) : undefined}
                                            onSelect={(date) => setFieldValue("date", date ? date.toISOString() : null)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {touched.date && typeof errors.date === "string" && (
                                    <p className="text-red-500 text-sm">{errors.date}</p>
                                )}
                            </div>

                            <div>
                                <Label>Notes</Label>
                                <Field as={Textarea} name="notes" placeholder="Additional details" />
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

export default AddTrade;
