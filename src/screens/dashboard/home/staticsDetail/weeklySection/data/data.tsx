export const data: Array<dataType> = [
  {item: 'home.week'},
  {item: 'home.month'},
  {item: 'home.year'},
];
export type dataType = {item: string};

export type activeTypes = {
  activeItem: number;
  setActiveItem: React.Dispatch<React.SetStateAction<number>>;
};
