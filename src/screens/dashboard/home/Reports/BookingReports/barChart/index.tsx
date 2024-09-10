import appColors from '@src/theme/appColors';
import { useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet, Alert  } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useValues } from '../../../../../../../App';
import Modal from 'react-native-modal';
 
 
// Define the type for the chart data
interface ChartData {
  value: number;
  label: string;
}

const YearAmountChart: React.FC = () => {
  // Array of chart data
  const {t,isDark} = useValues()
  const data: ChartData[] = [
    { value: 5000, label: '2018' },
    { value: 10000, label: '2019' },
    { value: 7500, label: '2020' },
    { value: 12000, label: '2021' },
    { value: 9500, label: '2022' },
    { value: 13500, label: '2023' },
  ];

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<ChartData | null>(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleBarPress = (data: ChartData, x: number, y: number) => {
    setSelectedData(data);
    setModalPosition({ x, y });
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        barWidth={30} // Width of each bar
        barBorderRadius={4} // Make bars rounded
        initialSpacing={20} // Space before first bar
        spacing={20} // Space between bars
        yAxisThickness={1} // Thickness of the Y-axis line
        xAxisThickness={1} // Thickness of the X-axis line
        xAxisLabelTextStyle={[styles.xAxisLabel,{color: isDark ? appColors.white : appColors.darkText,}]} // X-axis label style
        yAxisTextStyle={[styles.yAxisText,{color: isDark ? appColors.white : appColors.darkText,}]} // Y-axis text style
        hideRules={true} // Hides background grid lines
        frontColor={appColors.primary} // Color of the bars
        xAxisColor={appColors.gradientBtn} // Custom X-axis line color
        yAxisColor={ isDark ? appColors.darkTheme : appColors.white} // Custom Y-axis line color
        hideYAxisText={true}
        onPress={(data:any, x:number, y:number) => handleBarPress(data, x, y)}
      />
      
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {selectedData && (
            <>
              <Text style={styles.modalText}>{`Label: ${selectedData.label}`}</Text>
              <Text style={styles.modalText}>{`Value: ${selectedData.value}`}</Text>
            </>
          )}
        </View>
      </Modal>
        
    </View>
  );
};

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:10,
    paddingVertical:10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  xAxisLabel: {
    fontSize: 12,
  },
  yAxisText: {
    fontSize: 12,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});

export default YearAmountChart;
