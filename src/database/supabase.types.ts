/* eslint-disable prettier/prettier */
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description?: string;
          created_at?: string;
        };
        Insert: {
          name: string;
          description?: string;
        };
        Update: {
          name?: string;
          description?: string;
        };
      };
      product:{
       Row:{
        id : string;
        name : string;
        description : string;
        price : number;
        stock : number;
        image_url : string;
        category : string;
        category_id:string;
       }
      }
    };
  };
}


export type CategoryType = Database['public']['Tables']['categories']['Row'];

export type ProductType = Database['public']['Tables']['product']['Row'];