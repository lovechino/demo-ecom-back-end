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
      };
      orders:{
        Row:{
          id:string,
          user_id:string;
          status:string;
          total_amount:number;
          shipping_address:string;
          created_at:Date;
          ordercode : bigint
        }
      };
      order_items:{
        Row:{
          id:string;
          order_id:string;
          product_id:string;
          quantity:number;
          unit_price:number
        }
      }
    };
  };
}


export type CategoryType = Database['public']['Tables']['categories']['Row'];

export type ProductType = Database['public']['Tables']['product']['Row'];

export type OrderType = Database['public']['Tables']['orders']['Row'];

export type OrderItemsType = Database['public']['Tables']['order_items']['Row'];