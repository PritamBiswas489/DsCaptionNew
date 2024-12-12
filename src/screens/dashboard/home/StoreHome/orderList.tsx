import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useValues } from '../../../../../App';
import appColors from "@src/theme/appColors";

interface Order {
  id: string;
  date: string;
  time: string;
  status: string;
  items: number;
}

const OrderList: React.FC = () => {
    const { isDark, t } = useValues();
  const orders: Order[] = [
    {
      id: "#103235",
      date: "27 May 2024",
      time: "19:17",
      status: "Delivery",
      items: 2,
    },
    {
      id: "#101795",
      date: "05 Apr 2024",
      time: "14:34",
      status: "Delivery",
      items: 1,
    },
    {
      id: "#101794",
      date: "05 Apr 2024",
      time: "14:29",
      status: "Delivery",
      items: 1,
    },
    {
      id: "#101281",
      date: "13 Mar 2024",
      time: "09:37",
      status: "Delivery",
      items: 1,
    },
    {
        id: "#101281",
        date: "13 Mar 2024",
        time: "09:37",
        status: "Delivery",
        items: 1,
      },
      {
        id: "#101281",
        date: "13 Mar 2024",
        time: "09:37",
        status: "Delivery",
        items: 1,
      },
      {
        id: "#101281",
        date: "13 Mar 2024",
        time: "09:37",
        status: "Delivery",
        items: 1,
      },
      {
        id: "#101281",
        date: "13 Mar 2024",
        time: "09:37",
        status: "Delivery",
        items: 1,
      },
      {
        id: "#101281",
        date: "13 Mar 2024",
        time: "09:37",
        status: "Delivery",
        items: 1,
      },
      {
        id: "#101281",
        date: "13 Mar 2024",
        time: "09:37",
        status: "Delivery",
        items: 1,
      },
  ];

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={[styles.orderItem,{backgroundColor:isDark ? appColors.darkCardBg : appColors.white  }]}>
      <View style={styles.orderDetails}>
        <Text style={[styles.orderId,{color: isDark ? appColors.white : appColors.darkText,}]}>Order ID: {item.id}</Text>
        <Text style={[styles.orderDate,{color: isDark ? appColors.darkSubText : appColors.darkText}]}>
          {item.date} {item.time} | <Text style={styles.status}>{item.status}</Text>
        </Text>
      </View>
      <View style={styles.orderInfo}>
        <Text style={[styles.itemCount,{color: isDark ? appColors.darkSubText : appColors.darkText}]}>
          {item.items} {item.items > 1 ? "Items" : "Item"}
        </Text>
        <Text style={[styles.arrow,,{color: isDark ? appColors.darkSubText : appColors.darkText}]}>&gt;</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    marginTop: 4,
  },
  status: {
    color: "#4caf50", // Green for "Delivery"
    fontWeight: "bold",
  },
  orderInfo: {
    alignItems: "flex-end",
  },
  itemCount: {
    fontSize: 14,
    marginBottom: 4,
  },
  arrow: {
    fontSize: 18,
  },
});

export default OrderList;
