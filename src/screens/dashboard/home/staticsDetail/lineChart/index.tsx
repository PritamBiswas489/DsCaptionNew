import React from 'react';
import {View, Text} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import appColors from '@theme/appColors';
import {styles} from './styles';

export default function LineChartView(activeItem: {activeItem: number}) {
  const ptData = [
    {
      value: 0,
      label:
        activeItem.activeItem == 0
          ? 'M'
          : activeItem.activeItem == 1
          ? 'Ja'
          : '2016',
      labelTextStyle: styles.labelText,
    },
    {value: 10, date: '11 Apr 2022'},
    {value: 14, date: '12 Apr 2022'},
    {value: 16, date: '13 Apr 2022'},
    {value: 19, date: '23 Apr 2022'},
    {
      value: 6,
      label:
        activeItem.activeItem == 0
          ? 'T'
          : activeItem.activeItem == 1
          ? 'Fe'
          : '2017',
      labelTextStyle: styles.labelText,
    },
    {value: 17, date: '21 Apr 2022'},
    {value: 18, date: '22 Apr 2022'},
    {value: 19, date: '23 Apr 2022'},
    {value: 16, date: '13 Apr 2022'},
    {
      value: 12,
      label:
        activeItem.activeItem == 0
          ? 'W'
          : activeItem.activeItem == 1
          ? 'Ma'
          : '2018',
      labelTextStyle: styles.labelText,
    },
    {value: 21, date: '1 May 2022'},
    {value: 22, date: '2 May 2022'},
    {value: 23, date: '3 May 2022'},

    {
      value: 18,
      label:
        activeItem.activeItem == 0
          ? 'T'
          : activeItem.activeItem == 1
          ? 'Ap'
          : '2019',
      labelTextStyle: styles.labelText,
    },
    {value: 25, date: '1 May 2022'},
    {value: 19, date: '2 May 2022'},
    {value: 22, date: '3 May 2022'},
    {value: 25, date: '4 May 2022'},
    {
      value: 20,
      label:
        activeItem.activeItem == 0
          ? 'F'
          : activeItem.activeItem == 1
          ? 'Ma'
          : '2020',
      labelTextStyle: styles.labelText,
    },
    {value: 15, date: '1 May 2022'},
    {value: 18, date: '2 May 2022'},
    {value: 20, date: '3 May 2022'},
    {value: 25, date: '4 May 2022'},
    {
      value: 20,
      label:
        activeItem.activeItem == 0
          ? 'S'
          : activeItem.activeItem == 1
          ? 'Ju'
          : '2021',
      labelTextStyle: styles.labelText,
    },
    {value: 0, date: '1 May 2022'},
    {value: 8, date: '2 May 2022'},
    {value: 15, date: '3 May 2022'},
    {value: 25, date: '4 May 2022'},
    {
      value: 20,
      label:
        activeItem.activeItem == 0
          ? 'S'
          : activeItem.activeItem == 1
          ? 'JI'
          : '2022',
      labelTextStyle: styles.labelText,
    },
    {value: 0, date: '1 May 2022'},
    {value: 8, date: '2 May 2022'},
    {value: 15, date: '3 May 2022'},
    {value: 25, date: '4 May 2022'},
  ];

  return (
    <View style={styles.containerView}>
      <LineChart
        areaChart
        curved
        data={ptData}
        width={290}
        hideDataPoints
        spacing={10}
        color={appColors.primary}
        thickness={2}
        startFillColor={appColors.gradientColor}
        endFillColor="rgba(254, 120, 46, 0)"
        startOpacity={0.5}
        endOpacity={0.1}
        initialSpacing={4}
        noOfSections={5}
        minValue={5}
        maxValue={25}
        yAxisColor="white"
        yAxisThickness={0}
        yAxisLabelSuffix={'k'}
        rulesType="dotted"
        rulesColor={'#d4d5d6'}
        yAxisTextStyle={{color: 'gray'}}
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripHeight: 170,
          pointerStripColor: appColors.primary,
          pointerStripWidth: 2,
          pointerColor: appColors.primary,
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 190,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,

          pointerLabelComponent: (items: {value: string}[]) => {
            return (
              <View style={styles.textView}>
                <Text style={styles.textStyle}>{items[0].date}</Text>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: appColors.white,
                    }}>
                    {'$' + items[0].value + '.0'}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </View>
  );
}
