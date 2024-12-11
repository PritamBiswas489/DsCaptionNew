import { TouchableOpacity, View, Alert, StyleSheet, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '@style/styles';
import { Notification, Search, BookingFilterIcon, AddItemIcon } from '@utils/icons';
import Header from '@commonComponents/header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import appColors from '@theme/appColors';
import { useValues } from '../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrderCard from '@src/screens/dashboard/home/StoreOrders/orderCard';
import OrderFilterCard from '@src/screens/dashboard/home/StoreOrders/orderFilterCard';
import StatusCard from '@src/screens/dashboard/home/StoreOrders/statusCard';
import { deleteCoupon, listCoupons, updateStatus } from '@src/services/store/coupon.service';
import { couponActions } from '@src/store/redux/store/coupon-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
import NoDataFound from '@src/commonComponents/noDataFound';
import { noNotification, wifi } from '@src/utils/images';
import { windowHeight } from '@src/theme/appConstant';
import GradientBtn from '@src/commonComponents/gradientBtn';


interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
type routeProps = NativeStackNavigationProp<RootStackParamList>;


//store order list screen
export default function StoreOrders() {
    const dispatch = useDispatch()
    const { isDark, t } = useValues();
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');

    const {
        data: couponList,
        offset,
        limit,
        isFirstTimeLoading,
        isNoMoreData,
    } = useSelector((state: RootState) => state['coupon'])

    const [scrollPaging, setScrollPaging] = useState(false)

    //drag screen refresh page
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(couponActions.resetState())
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    //async coupon load for data show
    const asyncLoadCoupons = async () => {
        const response: Response = await listCoupons(limit, offset)

        if (response?.data && response?.data?.length > 0) {
            dispatch(couponActions.addCouponArr(response?.data))
        } else {
            dispatch(couponActions.setData({
                field: 'isNoMoreData',
                data: true
            }));
        }
        setScrollPaging(false);
        dispatch(couponActions.setData({
            field: 'isFirstTimeLoading',
            data: false
        }));
    }
    //onload coupon load 
    useEffect(() => {
        if ((isFirstTimeLoading || scrollPaging) && !isNoMoreData) {
            asyncLoadCoupons()
        }
    }, [isFirstTimeLoading, scrollPaging, isNoMoreData])

    //handle scroll processing
    const handleScrollProcessing = () => {
        if (isNoMoreData) { return; }
        setScrollPaging(true)
        dispatch(couponActions.setData({
            field: 'offset',
            data: offset + 1
        }));
    }

    const { navigate } = useNavigation<routeProps>();

    const navigateToEditPage = (couponId: string) => {
        navigate('EditVendorCoupon', { id: couponId });

    }
    const deleteCouponFromList = (couponId: number) => {
        Alert.alert(
            "Confirmation",
            t('newDeveloper.Areyousureyouwanttoproceed'),
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" // sets the text style to cancel
                },
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(couponActions.deleteCouponById(couponId))
                        deleteCoupon(couponId)
                    }
                }
            ],
            { cancelable: false } // prevents the alert from being dismissed by tapping outside
        );
    }
    const updateCouponStatus = (status: boolean, couponId: number) => {
        dispatch(couponActions.changeStatusById(couponId))
        updateStatus(status, couponId)

    }
    type Order = {
        id: string;
        date: string;
        time: string;
        type: string;
        status: string;
    };

    const processFilter = (value: string) => {
        if (selectedFilter !== value) {
            setSelectedFilter(value)
        }
    }

    const orders: Order[] = [
        { id: '#104063', date: '20 Jun 2024', time: '00:17', type: 'Delivery', status: 'Delivered' },
        { id: '#101606', date: '29 Mar 2024', time: '11:48', type: 'Take Away', status: 'Delivered' },
        { id: '#101581', date: '27 Mar 2024', time: '17:48', type: 'Delivery', status: 'Delivered' },
        { id: '#101280', date: '13 Mar 2024', time: '09:35', type: 'Delivery', status: 'Delivered' },
    ];
    return (
        <View style={[styles.container, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
            <Header
                showBackArrow={true}
                title={'newDeveloper.StoreOrderHistory'}
                content={''}
            />
            <View style={{ marginTop: 5 }}>
                <StatusCard/>
            </View>
            <View style={{ marginTop: 5 }}>
                <OrderFilterCard selectedFilter={selectedFilter} setSelectedFilter={processFilter} />
            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    GlobalStyle.contentContainerStyle,
                ]}
                style={[
                    GlobalStyle.mainView, {  backgroundColor: isDark ? appColors.darkTheme : appColors.white,  },
                ]}
            >
                {/* {isFirstTimeLoading && <SkeletonLoader />}
                {!isFirstTimeLoading && couponList.length === 0 && <NoDataFound
                    headerTitle="home.noInternet"
                    image={noNotification}
                    title="newDeveloper.Nodatafound"
                    content="newDeveloper.noCouponFound"
                    gradiantBtn={<GradientBtn
                        additionalStyle={{ bottom: windowHeight(2) }}
                        label={'common.refresh'}
                        onPress={() => {
                            dispatch(couponActions.resetState())
                        }} />} infoImage={undefined} />} */}

                {/* {!isFirstTimeLoading && couponList.length > 0 && */}
                <FlatList
                    data={orders}
                    renderItem={({ item }) => {
                        return <OrderCard item={item} />
                    }}
                    keyExtractor={(item) => item.id}
                />
                {/* } */}
                <View style={GlobalStyle.blankView} />
            </ScrollView>
            {/* {scrollPaging && <ActivityIndicator />} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedFilter: {
        top: 0,
        width: '100%',
        zIndex: 1,

        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3
    },
});
