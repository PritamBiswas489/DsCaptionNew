import {subCategoryType} from '../data/types';

export type itemType = {
  selectedCategory: number;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  item: subCategoryType;
  index: number;
  scrollIndex: any;
};
