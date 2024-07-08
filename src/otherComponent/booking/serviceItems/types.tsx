import {ImageSourcePropType, ImageStyle, TextStyle} from 'react-native';
export type ServiceTypes = {
  serviceImage: ImageSourcePropType;
  serviceName: string;
  price: number;
  bookingId?: string;
  isPackageService?: boolean;
  status: string;
  statusBgColor: string;
};

export interface ServiceItemsProps {
  item: ServiceTypes;
  imageStyle?: ImageStyle;
  priceStyle?: TextStyle;
  textStyle?: TextStyle;
}
