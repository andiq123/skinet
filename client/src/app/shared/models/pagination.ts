import { IProduct } from './product';
export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  items: IProduct[];
}
