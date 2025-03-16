import  supabase  from '../config/supabase/supabase'

export interface AssetData {

  email: string;
  assetName: string;
  symbol: string;
  type: string;
  purchasePrice: number;
  quantity: number;
  dateOfPurchase: null | string;
  notes?: string | null;
  user_id: string
}
export interface AssetDataBase extends AssetData {
  id: number
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
        user_id: values.user_id,
      },
    ]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const updateAsset = async (id: number, values: AssetDataBase) => {
  const { data, error } = await supabase
    .from("assets")
    .update({
      id: values.id,
      email: values.email,
      assetName: values.assetName,
      symbol: values.symbol,
      type: values.type,
      purchasePrice: values.purchasePrice,
      quantity: values.quantity,
      dateOfPurchase: values.dateOfPurchase,
      notes: values.notes || null,
    })
    .eq("id", id);

  if (error) {
    console.error( error);
    throw error;
  }

  return data;
};

export const getAssets = async (id?: number): Promise<AssetDataBase[]> => {
  let query = supabase.from("assets").select("*");

  if (id !== undefined) {
    query = query.eq("id", id);
  }

  const { data, error } = await query;
  if (error) {
    console.error( error);
    throw error;
  }
  
  return data;
};

export const deleteAsset = async (id: number) => {
  console.log('deleing', id);
  
  const { data, error } = await supabase.from("assets").delete().eq("id", id);

  if (error) {
    console.error( error);
    throw error;
  }

  return data;
};
