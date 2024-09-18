import React from "react";
import { RootState, AppDispatch } from '@src/store';
import { customerChannelActions } from "@src/store/redux/customer-channels-redux";
import { adminChannelActions } from "@src/store/redux/admin-channel-redux";
import { serviceMenChannelActions } from "@src/store/redux/serviceman-channels-redux";
import { getCustomerChannels } from "./chat.service";
import { getServicemanChannels } from "./chat.service";
interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}
//load customer channels
export const loadCustomerChannels = async(
    limit:number,
    offset:number,
    adminChannelFirsttimeload:boolean,
    dispatch:AppDispatch,
    
)=>{
    const response:Response = await getCustomerChannels(limit,offset);
    if(response?.data?.response_code === 'default_200'){
            if(adminChannelFirsttimeload){
               dispatch(adminChannelActions.setData({field:'channel',data:response?.data?.content?.adminChannel}))
               dispatch(adminChannelActions.setData({
                field: 'isFirstTimeLoading',
                data: false
              }));
            }
            if(response?.data?.content?.channelList?.data){
                dispatch(customerChannelActions.setChannels(
                    response?.data?.content?.channelList?.data
                ))
            }
            dispatch(customerChannelActions.setData({
                field: 'isFirstTimeLoading',
                data: false
            }));
    }else{
        dispatch(customerChannelActions.setData({
            field: 'isFirstTimeLoading',
            data: false
        }));
    }
}
//load serviceman channels
export  const loadServiceManChannels = async(
    limit:number,
    offset:number,
    adminChannelFirsttimeload:boolean,
    dispatch:AppDispatch)=>{
        const response:Response = await getServicemanChannels(limit,offset);
        if(response?.data?.response_code === 'default_200'){
            if(adminChannelFirsttimeload){
                dispatch(adminChannelActions.setData({field:'channel',data:response?.data?.content?.adminChannel}))
                dispatch(adminChannelActions.setData({
                    field: 'isFirstTimeLoading',
                    data: false
                  }));
             }
             if(response?.data?.content?.channelList?.data){
                dispatch(serviceMenChannelActions.setChannels(
                    response?.data?.content?.channelList?.data
                ))
            }
            dispatch(serviceMenChannelActions.setData({
                field: 'isFirstTimeLoading',
                data: false
            }));
                 
        }else{
            dispatch(serviceMenChannelActions.setData({
                field: 'isFirstTimeLoading',
                data: false
            }));
        }

}



