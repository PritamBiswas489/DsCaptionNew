import {subCategoryType} from '../data/types';
import { SubCategoriesInterface } from '@src/interfaces/subCategoriesInterface';
export type itemType = {
  selectedCategory: string;
  setCategory: (value:string)=>void;
  item: SubCategoriesInterface;
  index: number;
  flatListRef: any;
};
