import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useValues } from '../../../../../App';
import appColors from '@src/theme/appColors';

type ExpenseItemProps = {
    orderId: string;
    date: string;
    time: string;
    expenseType: string;
    amount: string;
};

const ExpenseItemCard: React.FC<ExpenseItemProps> = ({ orderId, date, time, expenseType, amount }) => {
    const { isDark, t, currSymbol } = useValues();
    return (
        <View style={[styles.container,
        { backgroundColor: isDark ? appColors.darkCardBg : appColors.white, }
        ]}>
            <Text style={[styles.orderId,
            { color: isDark ? appColors.white : appColors.darkText }
            ]}>Order ID: #{orderId}</Text>
            <View style={[styles.dateRow]}>
                <Text style={[styles.dateText,
                { color: isDark ? appColors.darkSubText : appColors.darkText }
                ]}>{date} {time}</Text>
                <Text style={[styles.amountLabel,
                 { color: isDark ? appColors.darkSubText : appColors.darkText }
                ]}>Amount</Text>
            </View>
            <View style={[styles.expenseRow]}>
                <Text style={[styles.expenseTypeLabel,
                    { color: isDark ? appColors.darkSubText : appColors.darkText }
                ]}>Expense Type -</Text>

                <Text style={[styles.expenseType,
                    { color: appColors.primary }
                ]}>{expenseType}</Text>
                <Text style={[styles.amount,
                     { color: isDark ? appColors.white : appColors.darkText }
                ]}>{currSymbol}{amount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateText: {
    },
    amountLabel: {
        fontWeight: 'bold',
    },
    expenseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expenseTypeLabel: {
    },
    expenseType: {
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default ExpenseItemCard;
