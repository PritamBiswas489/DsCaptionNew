import appColors from "@src/theme/appColors";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useValues } from '../../../../../App';

const OrderStatusList = () => {
    const { isDark, t } = useValues();
    const menuItems = [
        { label: "Pending", count: 0, active: true },
        { label: "Confirmed", count: 0, active: false },
        { label: "Processing", count: 0, active: false },
        { label: "Ready For Handover", count: 0, active: false },
        { label: "Delivery Item Is On The Way", count: 4, active: false },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {menuItems.map((item, index) => { 
                    return <TouchableOpacity
                        key={index}
                        style={[styles.menuItem,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white, borderColor: isDark ? appColors.darkBorder : appColors.border  }, item.active && styles.activeItem]}
                    >
                        <Text
                            style={[
                                styles.menuText,
                                {color: isDark ? appColors.white : appColors.darkText,},
                                item.active && styles.activeText,
                            ]}
                        >
                            {item.label} ({item.count})
                        </Text>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    scrollContainer: {
        alignItems: "center",
        paddingHorizontal: 10,
    },
    menuItem: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    activeItem: {
        backgroundColor: appColors.primary,
        borderColor: appColors.primary,
        
    },
    menuText: {
        fontSize: 14,
        color: "#555",
    },
    activeText: {
        color:appColors.white
    },
});

export default OrderStatusList;
