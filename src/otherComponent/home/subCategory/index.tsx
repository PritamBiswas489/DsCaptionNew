import {View, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {subCategoryData} from './data/data';
import {styles} from './styles';
import {categoryType} from './data/types';
import RenderItem from './renderItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';
import { getServices } from '@src/services/services-service';
import { serviceActions } from '@src/store/redux/service-redux';
import { ServiceInterface } from '@src/interfaces/serviceInterface';
import { ActivityIndicator } from 'react-native';
 

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}


export default function SubCategory({}) {
  const flatListRef = useRef<FlatList>(null);
  const [selectedSubCategory,setSubCategory]  = useState('')
  const dispatch = useDispatch()

  const {
    selected:ServiceSubCategories,
    loading:ServiceSubCategoriesLoading,
  } = useSelector((state: RootState) => state['serviceSubCategories'])

  const {
    data:Services
  } = useSelector((state: RootState) => state['servicesData'])

 
  useEffect(()=>{
     if(ServiceSubCategories?.subcategories){
        const firstSubCategory = ServiceSubCategories.subcategories.slice(0,1)
        setSubCategory(firstSubCategory?.[0]?.id)
     }
  },[ServiceSubCategories])
 
  const loadingServices = async () =>{
     const queryParam = `?limit=200&offset=1&sub_category_id=${selectedSubCategory}`
     const response:Response = await getServices(queryParam)
     if (response?.data?.content?.data) {
      const services = response?.data?.content?.data
      if (services.length > 0) {
              const formattedData: ServiceInterface[] = response.data.content.data.map((serviceData: any) => ({
                id: serviceData?.id,
                name: serviceData?.name,
                short_description: serviceData?.short_description,
                description: serviceData?.description,
                cover_image: serviceData?.cover_image,
                thumbnail: serviceData?.thumbnail,
                order_count: serviceData?.order_count,
                avg_rating: serviceData?.avg_rating,
                min_bidding_price: serviceData?.min_bidding_price,
                category:serviceData?.category?.name,
              }))

              // console.log("=============== checking formatted data =========")
              // console.log(formattedData)
              
              dispatch(serviceActions.addServices({id:selectedSubCategory,services:formattedData}))
              dispatch(serviceActions.setData({field:'selected',data:{id:selectedSubCategory,services:formattedData}}))
              
      }
    }
    dispatch(serviceActions.setData({field:'loading',data:false}))
  }
 
  useEffect(()=>{
    if(selectedSubCategory!=''){
      dispatch(serviceActions.setData({field:'loading',data:true}))
       const checkExisting = Services.find(elementDet => elementDet.subCategoryId === selectedSubCategory);  
       if(!checkExisting){
          loadingServices()   
       } else{
        dispatch(serviceActions.setData({field:'selected',data:{id:selectedSubCategory,services:checkExisting.services}}))
        dispatch(serviceActions.setData({field:'loading',data:false}))
       }   
    }

  },[selectedSubCategory])



 
  return (
    <View>
    {ServiceSubCategoriesLoading && <ActivityIndicator style={{marginTop:10}}/> }  
    {!ServiceSubCategoriesLoading && <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.mainContainer}
        data={ServiceSubCategories.subcategories}
        renderItem={({index, item}) => {
          return (
            <RenderItem
              selectedCategory={selectedSubCategory}
              setCategory={setSubCategory}
              item={item}
              index={index}
              flatListRef={flatListRef}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />}
    </View>
  );
}
