import  supabase  from '../config/supabase/supabase'

export interface AssetData {
  id?: number; 
  email: string;
  assetName: string;
  symbol: string;
  type: string;
  purchasePrice: number;
  quantity: number;
  dateOfPurchase: string | null;
  notes?: string;
}

export const addAsset = async (values: AssetData) => {
  const { data, error } = await supabase
    .from("assets")
    .insert([
      {
        email: values.email,
        assetName: values.assetName,
        symbol: values.symbol,
        type: values.type,
        purchasePrice: values.purchasePrice,
        quantity: values.quantity,
        dateOfPurchase: values.dateOfPurchase, 
        notes: values.notes || null,
      },
    ]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const updateAsset = async (id: number, values: AssetData) => {
  const { data, error } = await supabase
    .from("asset")
    .update({
      email: values.email,
      assetName: values.assetName,
      symbol: values.symbol,
      type: values.type,
      purchasePrice: values.purchasePrice,
      quantity: values.quantity,
      dateOfPurcha: values.dateOfPurchase,
      notes: values.notes || null,
    })
    .eq("id", id);

  if (error) {
    console.error( error);
    throw error;
  }

  return data;
};

export const getAssets = async (): Promise<AssetData[]> => {
  const { data, error } = await supabase.from("assets").select("*");

  if (error) {
    console.error( error);
    throw error;
  }
  
  return data;
};

export const deleteAsset = async (id: number) => {
  const { data, error } = await supabase.from("asset").delete().eq("id", id);

  if (error) {
    console.error( error);
    throw error;
  }

  return data;
};
