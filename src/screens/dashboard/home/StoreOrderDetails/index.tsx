import appColors from '@src/theme/appColors';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '@style/styles';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useValues } from '../../../../../App';
import Header from '@commonComponents/header';
import SwipeButton from './SwipeButton';
import { getCurrentOrderDetails, getOrderProductList } from '@src/services/store/order.service';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigation/types';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
import { datetimeArr, convertToTitleCase } from '@src/config/utility';
import { DashLine } from '@src/commonComponents';

interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'StoreOrderDetails'>;
type ItemsProps = NativeStackNavigationProp<RootStackParamList>;
const StoreOrderDetails = () => {
    const { isDark, t } = useValues();
    const route = useRoute<OrderDetailsRouteProp>();
    const navigation = useNavigation<ItemsProps>();
    const OrderId = route?.params?.OrderId
    const [orderMainDetails, setOrderMainDetails] = useState<any>({}); //order main details
    const [orderProductItemList, setOrderProductItemList] = useState<any[]>([])
    const [showSkeletonLoader, setShowSkeletonloader] = useState(false)
    const [ordertime, setOrdertime] = useState<any>({})

    //load current order details and item list
    const loadCurrentOrderDetails = async () => {
        setShowSkeletonloader(true)
        const [orderDetails, orderProductList] = await Promise.all([
            getCurrentOrderDetails(OrderId), getOrderProductList(OrderId),
        ])
        setShowSkeletonloader(false)
        if (!orderDetails?.data?.id) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: t('newDeveloper.OrderDetailsNotFound'),
            });
            navigation.goBack()
            return
        }
        setOrderMainDetails(orderDetails?.data) //order main details
        if (orderDetails?.data?.created_at) {
            setOrdertime(datetimeArr(orderDetails?.data?.created_at))
        }
        setOrderProductItemList(orderProductList?.data) //order product list
    }
    useEffect(() => {
        loadCurrentOrderDetails()
    }, [OrderId])

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadCurrentOrderDetails()
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: isDark ? appColors.darkTheme : appColors.white, }]}>
            <Header showBackArrow={true} title={'newDeveloper.OrderDetails'} />
            {showSkeletonLoader && <SkeletonLoader />}
            {!showSkeletonLoader && <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    GlobalStyle.contentContainerStyle,
                ]}
                style={[
                    GlobalStyle.mainView,
                    {
                        backgroundColor: isDark ? appColors.darkTheme : appColors.white,
                        marginTop: 20
                    },
                ]}
            >
                <View style={[styles.headerContainer]}>
                    <Text style={[styles.orderId, { color: isDark ? appColors.white : appColors.darkText, }]}>{t('newDeveloper.OrderID')}: #{orderMainDetails?.id}</Text>
                    <Text style={[styles.dateTime, { color: isDark ? appColors.white : appColors.darkText, }]}> {ordertime?.day} {ordertime?.month} {ordertime?.year}  {ordertime?.hours}:{ordertime?.minutes} {ordertime?.ampm}</Text>
                </View>

                {/* Delivery Info */}
                <View style={[styles.deliveryContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <Text style={[styles.deliveryLabel, { color: isDark ? appColors.white : appColors.darkText, }]}>{orderMainDetails?.order_type && t(`newDeveloper.${orderMainDetails.order_type}`)}</Text>
                    <Text style={[styles.cashOnDelivery, { color: isDark ? appColors.white : appColors.darkText, }]}>{orderMainDetails?.payment_method && convertToTitleCase(orderMainDetails?.payment_method)}</Text>
                </View>

                {/* Item Details */}
                <View style={[styles.itemContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <View style={[styles.itemHeader]}>
                        <Text style={[styles.itemLabel, { color: isDark ? appColors.white : appColors.darkText, }]}>Item: 1</Text>
                        <Text style={[styles.processing]}>Processing</Text>
                    </View>

                    <View style={[styles.itemDetails, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with actual image URL
                            style={[styles.itemImage]}
                        />
                        <View style={[styles.itemInfo]}>
                            <Text style={[styles.itemName, { color: isDark ? appColors.white : appColors.darkText, }]}>Champs</Text>
                            <Text style={[styles.itemPrice, { color: isDark ? appColors.white : appColors.darkText, }]}>419</Text>
                            <Text style={[styles.itemVariation, { color: isDark ? appColors.white : appColors.darkText, }]}>Variations: COLOR - White, Size - 5</Text>
                        </View>
                    </View>
                </View>

                {/* Customer Details */}
                <View style={[styles.customerContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <Text style={[styles.customerLabel, { color: appColors.primary }]}>{t('newDeveloper.CustomerDetails')}</Text>
                    
                    <View style={[styles.customerDetails]}>
                       
                        <View>
                            <Text style={[styles.customerName, { color: isDark ? appColors.white : appColors.darkText, }]}>{orderMainDetails?.delivery_address?.contact_person_name}</Text>
                            <Text style={[styles.customerAddress, { color: isDark ? appColors.white : appColors.darkText, }]}>{orderMainDetails?.delivery_address?.address}</Text>
                        </View>
                        <TouchableOpacity style={[styles.chatButton]}>
                            <Text style={[styles.chatText]}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* delivery man details */}
                

                {/* Pricing Details */}
                <View style={[styles.pricingContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.ItemPrice')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>419</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.Discount')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(-) 4</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.Coupondiscount')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(-) 4</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.Referraldiscount')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(-) 4</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.VatTax')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(+) 0</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.DeliveryManTips')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(+) 0</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.PlatformCharge')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(+) 3</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.DeliveryFee')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(+) 0</Text></View>
                    <View style={[styles.priceRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.Extrapackaging')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>(+) 0</Text></View>
                    <View style={[styles.totalRow]}><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>{t('newDeveloper.TotalAmount')}</Text><Text style={{ color: isDark ? appColors.white : appColors.darkText, }}>418</Text></View>
                </View>

                {/* Actions */}
                <View style={[styles.actionContainer]}>
                    <SwipeButton onSwipeComplete={() => console.log('Swiped!')} />
                    <TouchableOpacity style={[styles.printButton]}>
                        <Text style={[styles.printText]}>Print Invoice</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateTime: {
        fontSize: 14,
        color: '#555',
    },
    deliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    deliveryLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    cashOnDelivery: {
        fontSize: 14,
        color: '#28a745',
    },
    itemContainer: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    processing: {
        fontSize: 14,
        color: '#ffc107',
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#555',
    },
    itemVariation: {
        fontSize: 12,
        color: '#777',
    },
    customerContainer: {

        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    customerLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    customerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,

        marginRight: 16,
    },
    customerName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    customerAddress: {
        fontSize: 12,
        color: '#777',
    },
    chatButton: {
        marginLeft: 'auto',
        backgroundColor: appColors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        position: 'absolute',
        right: 0,
        bottom: 50
    },
    chatText: {
        color: '#fff',
        fontSize: 12,
    },
    pricingContainer: {

        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 8,
        fontWeight: 'bold',
    },
    actionContainer: {
        alignItems: 'center',
    },

    printButton: {
        backgroundColor: appColors.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 25,
        width: '100%',
        marginTop: 10,

    },
    printText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StoreOrderDetails;