import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeBookingList } from '@src/services/load.booking.service';
import { loadMySubscriptionFunc } from '@src/services/load.mysubscription';
import { homeDataActions } from '@src/store/redux/home-data-redux';
import { RootState, AppDispatch } from '@src/store';
import { homeloadServiceMenData } from '@src/services/load.servicemen';

const useHomeDataLoader = () => {
    const dispatch = useDispatch();
  
    const {
      serviceMenLimit,
      bookingList,
      loadBookingList,
      loadServiceMen,
      loadSubsScriptionList
    } = useSelector((state: RootState) => state['homeData']);

    // console.log(loadBookingList,loadServiceMen,loadSubsScriptionList)
  
    // Function to load Service Men Data
    const loadServiceMenData = useCallback(async () => {
        if (loadServiceMen) {
                const queryParams = `?offset=1&limit=${serviceMenLimit}&status=active`;
                await homeloadServiceMenData(queryParams, dispatch);
                dispatch(homeDataActions.setData({ field: 'loadServiceMen', data: false }));
        }
    }, [serviceMenLimit, dispatch,loadServiceMen]);
  
    // Function to load Subscription Data
    const loadSubscriptionData = useCallback(async () => {
        if (loadSubsScriptionList) {
            await loadMySubscriptionFunc(dispatch, '?limit=200&offset=1');
            dispatch(homeDataActions.setData({ field: 'loadSubsScriptionList', data: false }));
        }
    }, [dispatch,loadSubsScriptionList]);
  
    // Function to load Booking Data
    const loadRecentBookingData = useCallback(async () => {
        if (loadBookingList) {
          await homeBookingList(dispatch);
          dispatch(homeDataActions.setData({ field: 'loadBookingList', data: false }));
        }
    }, [dispatch,loadBookingList]);
  
    
    const callAllFunctionHome = async()=>{
         
       await loadServiceMenData()
       await loadSubscriptionData()
       await loadRecentBookingData()
    }
     
    return {
        callAllFunctionHome
      };

     
  };
  
  export default useHomeDataLoader;