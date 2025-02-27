import { Types } from 'mongoose';

export type TCustomerAddress = {
  roadNo: string;
  blockNo: string;
  buildingNo: string;
  area: string;
  city: string;
};

export type TOrder = {
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  deliveryDate: Date;
  orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  customerAddress: TCustomerAddress;
};
