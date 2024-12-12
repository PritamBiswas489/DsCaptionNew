import appColors from '@src/theme/appColors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useValues } from '../../../../../App';

const TransactionHistory: React.FC = () => {
    const { isDark, t } = useValues();
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity>
                    <Text style={styles.activeTab}>Withdraw Request</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.inactiveTab,{color: isDark ? appColors.white : appColors.darkText,}]}>Payment History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.transactionContainer}>
                <Text style={[styles.transactionTitle,{color: isDark ? appColors.white : appColors.darkText}]}>Transaction History</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.transactionDetails,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
                <Text style={[styles.amount,{color: isDark ? appColors.white : appColors.darkText}]}>₹ 255</Text>
                <View style={styles.detailContainer}>
                    <Text style={[styles.detail,{color: isDark ? appColors.darkSubText : appColors.darkText}]}>Transferred to Account</Text>
                    <Text style={[styles.date,{color: isDark ? appColors.darkSubText : appColors.darkText}]}>01 Apr 2024 19:05</Text>
                </View>
                <Text style={styles.status}>Approved</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    activeTab: {
        fontSize: 16,
        fontWeight: 'bold',
        color: appColors.primary,
        borderBottomWidth: 2,
        borderBottomColor: appColors.primary,
        paddingBottom: 4,
        marginRight: 16,
    },
    inactiveTab: {
        fontSize: 16,
        paddingBottom: 4,
        marginRight: 16,
    },
    transactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    transactionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 16,
        color: appColors.primary,
    },
    transactionDetails: {
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detail: {
        fontSize: 14,
    },
    date: {
        fontSize: 14,
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold',
        color: appColors.primary,
    },
});

export default TransactionHistory;
