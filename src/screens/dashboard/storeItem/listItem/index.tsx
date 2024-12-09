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
import PanelCard from './panelCard';
import SkeletonLoader from '@src/commonComponents/SkeletonLoader';
import NoDataFound from '@src/commonComponents/noDataFound';
import { noNotification, wifi } from '@src/utils/images';
import { windowHeight } from '@src/theme/appConstant';
import GradientBtn from '@src/commonComponents/gradientBtn';
import { getItemList } from '@src/services/store/item.service';
import { storeItemsActions } from '@src/store/redux/store/store-item-redux';
interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
type routeProps = NativeStackNavigationProp<RootStackParamList>;

//List items
export default function ListItem() {
    const dispatch = useDispatch()
    const { isDark, t } = useValues();
    const [refreshing, setRefreshing] = React.useState(false);
    const {
        data: storeItemList,
        offset,
        limit,
        isFirstTimeLoading,
        isNoMoreData,
    } = useSelector((state: RootState) => state['storeItem'])

    const [scrollPaging, setScrollPaging] = useState(false)

    //drag screen refresh page
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(storeItemsActions.resetState())
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    //async addons load for data show
    const asyncLoadItems = async () => {
        const response: Response = await getItemList(limit, offset)
        console.log(JSON.stringify(response?.data));
        if (response?.data?.items && response?.data?.items.length > 0) {
            dispatch(storeItemsActions.addItemArr(response?.data?.items))
        } else {
            dispatch(storeItemsActions.setData({
                field: 'isNoMoreData',
                data: true
            }));
        }
        setScrollPaging(false);
        dispatch(storeItemsActions.setData({
            field: 'isFirstTimeLoading',
            data: false
        }));
    }
    useEffect(() => {
        if ((isFirstTimeLoading || scrollPaging) && !isNoMoreData) {
            asyncLoadItems()
        }
    }, [isFirstTimeLoading, scrollPaging, isNoMoreData])


    const { navigate } = useNavigation<routeProps>();

    const navigateToEditPage = (id: string, name: string, price: string) => {
        navigate('EditVendorAddon', { id, name, price });

    }
    const deleteAddonFromList = (addonid: number) => {
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
                        // dispatch(vendorAddonsActions.deleteAddonById(addonid))
                        // deleteAddon(addonid)
                    }
                }
            ],
            { cancelable: false } // prevents the alert from being dismissed by tapping outside
        );
    }

    const handleScrollProcessing = () => {
        if (isNoMoreData){ return; }
        setScrollPaging(true)
        dispatch(storeItemsActions.setData({
            field: 'offset',
            data: offset + 1
        }));
    }

    return (
        <View style={[styles.container, { backgroundColor: isDark ? appColors.darkCardBg : appColors.white }]}>
            <Header
                showBackArrow={true}
                title={'newDeveloper.ListItem'}
                content={''}
                trailIcon1={<AddItemIcon />}
                onTrailIcon={() => { navigate('VendorAddItem') }}
            />
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
                    },
                ]}
            >
                {isFirstTimeLoading && <SkeletonLoader />}
                {!isFirstTimeLoading && storeItemList.length === 0 && <NoDataFound
                    headerTitle="home.noInternet"
                    image={noNotification}
                    title="newDeveloper.Nodatafound"
                    content="newDeveloper.noCouponFound"
                    gradiantBtn={<GradientBtn
                        additionalStyle={{ bottom: windowHeight(2) }}
                        label={'common.refresh'}
                        onPress={() => {
                            dispatch(storeItemsActions.resetState())
                        }} />} infoImage={undefined} />}

                {!isFirstTimeLoading && storeItemList.length > 0 &&
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={storeItemList}
                        onEndReached={handleScrollProcessing}
                        renderItem={({ item }) => (
                            <>
                                <PanelCard
                                    title={item.name}
                                    imageUrl="https://via.placeholder.com/80"
                                    price={93}
                                    originalPrice={103}
                                    discount="10% OFF"
                                    rating={4.5}
                                    reviews={10}
                                    onEdit={() => { }}
                                    onDelete={() => { }}
                                />
                            </>
                        )} />
                }
                <View style={GlobalStyle.blankView} />
            </ScrollView>
            {scrollPaging && <ActivityIndicator />}
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
