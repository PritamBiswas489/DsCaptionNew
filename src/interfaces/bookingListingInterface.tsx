export interface BookingListingInterface {
    readableId:string;
    bookingStatus:string;
    totalBookingAmount: number;
    serviceSchedule:string;
    createdAt:string;
    isChecked: number;
    isGuest: number;
    isPaid: number;
    isVerified: number;
    subCategoryName:string;
    subCategoryImage:string;
    customerName:string;
    customerEmail:string;
    customerGender:string;
    customerProfileImage:string;
}