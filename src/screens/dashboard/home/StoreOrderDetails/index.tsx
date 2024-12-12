import appColors from '@src/theme/appColors';
import React from 'react';
import { GlobalStyle } from '@style/styles';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useValues } from '../../../../../App';
import Header from '@commonComponents/header';
import SwipeButton from './SwipeButton';


const StoreOrderDetails = () => {
    const { isDark, t } = useValues();
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: isDark ? appColors.darkTheme : appColors.white, }]}>
            <Header showBackArrow={true} title={'newDeveloper.StoreHome'} />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    GlobalStyle.contentContainerStyle,
                ]}
                style={[
                    GlobalStyle.mainView,
                    {
                        backgroundColor: isDark ? appColors.darkTheme : appColors.white,
                        marginTop: 10
                    },
                ]}
            >
                <View style={[styles.headerContainer]}>
                    <Text style={[styles.orderId]}>Order ID: 108373</Text>
                    <Text style={[styles.dateTime]}>16 Oct 2024  14:50</Text>
                </View>

                {/* Delivery Info */}
                <View style={[styles.deliveryContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <Text style={[styles.deliveryLabel]}>Delivery</Text>
                    <Text style={[styles.cashOnDelivery]}>Cash On Delivery</Text>
                </View>

                {/* Item Details */}
                <View style={[styles.itemContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <View style={[styles.itemHeader]}>
                        <Text style={[styles.itemLabel]}>Item: 1</Text>
                        <Text style={[styles.processing]}>Processing</Text>
                    </View>

                    <View style={[styles.itemDetails, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with actual image URL
                            style={[styles.itemImage]}
                        />
                        <View style={[styles.itemInfo]}>
                            <Text style={[styles.itemName]}>Champs</Text>
                            <Text style={[styles.itemPrice]}>419</Text>
                            <Text style={[styles.itemVariation]}>Variations: COLOR - White, Size - 5</Text>
                        </View>
                    </View>
                </View>

                {/* Customer Details */}
                <View style={[styles.customerContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <Text style={[styles.customerLabel]}>Customer Details</Text>
                    <View style={[styles.customerDetails]}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with actual image URL
                            style={[styles.itemImage]}
                        />
                        <View>
                            <Text style={[styles.customerName]}>Demo Demo</Text>
                            <Text style={[styles.customerAddress]}>Bidhanagar, Kolkata, West Bengal, India</Text>
                        </View>
                        <TouchableOpacity style={[styles.chatButton]}>
                            <Text style={[styles.chatText]}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pricing Details */}
                <View style={[styles.pricingContainer, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
                    <View style={[styles.priceRow]}><Text>Item Price</Text><Text>419</Text></View>
                    <View style={[styles.priceRow]}><Text>Discount</Text><Text>(-) 4</Text></View>
                    <View style={[styles.priceRow]}><Text>VAT/Tax</Text><Text>(+) 0</Text></View>
                    <View style={[styles.priceRow]}><Text>Delivery Man Tips</Text><Text>(+) 0</Text></View>
                    <View style={[styles.priceRow]}><Text>Platform Charge</Text><Text>(+) 3</Text></View>
                    <View style={[styles.priceRow]}><Text>Delivery Fee</Text><Text>(+) 0</Text></View>
                    <View style={[styles.totalRow]}><Text>Total Amount</Text><Text>418</Text></View>
                </View>

                {/* Actions */}
                <View style={[styles.actionContainer]}>
                    <SwipeButton onSwipeComplete={() => console.log('Swiped!')} />
                    <TouchableOpacity style={[styles.printButton]}>
                        <Text style={[styles.printText]}>Print Invoice</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
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
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
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