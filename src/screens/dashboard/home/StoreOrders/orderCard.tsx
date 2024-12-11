import appColors from '@src/theme/appColors';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useValues } from '../../../../../App';

type Order = {
    id: string;
    date: string;
    time: string;
    type: string;
    status: string;
};
//order card 
const OrderCard = ({ item }: { item: Order }) => {
    const { isDark, t } = useValues();
    return <View style={styles.orderContainer}>
        <View style={styles.orderInfo}>
            <Text style={[styles.orderId, { color: isDark ? appColors.white : appColors.darkText }]}>Order ID: {item.id}</Text>
            <Text style={[styles.orderDate, { color: isDark ? appColors.darkSubText : appColors.darkText }]}>{item.date} {item.time}</Text>
            <Text style={[styles.orderType, { color: appColors.primary }]}>{item.type}</Text>
        </View>
        <View style={[styles.statusButton, { backgroundColor: appColors.success }]}>
            <Text style={[styles.statusText, { color: appColors.white }]}>{item.status}</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    orderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderInfo: {
        flexDirection: 'column',
    },
    orderId: {
        fontWeight: 'bold',
    },
    orderDate: {

    },
    orderType: {

    },
    statusButton: {
        borderRadius: 4,
        paddingVertical: 1,
        paddingHorizontal: 8,
        height: 25
    },
    statusText: {
        fontWeight: 'bold',
    },
});

export default OrderCard;
