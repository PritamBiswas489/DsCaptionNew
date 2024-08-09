// ThreeDotDropdown.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any other icon set
import { useValues } from '../../../../../App';
import { useSelector } from 'react-redux';
import { serviceMenType } from '../../home/activeServicemen/data/types';

const ActionMenuServiceMen = ({ 
    item, 
    handleNavigateToDetailsPage, 
    deleteServiceMen,
    editServiceMen 
}: {
    item: serviceMenType,
    handleNavigateToDetailsPage: (value:string) => void,
    deleteServiceMen:(value:string) => void,
    editServiceMen:(value:string) => void
}) => {

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    let options = [];
    const { t } = useValues()

    options = [
        { id: 1, label: t('newDeveloper.PreviewServicemenDetails'), onPress: () => handleOptionPress('PREVIEW') },
        { id: 2, label: t('newDeveloper.DeleteServiceDetails'), onPress: () => handleOptionPress('DELETE') },
        { id: 3, label: t('newDeveloper.EditServicemenDetails'), onPress: () => handleOptionPress('EDIT') },
        { id: 4, label: t('newDeveloper.CallServicemen'), onPress: () => handleOptionPress('CALL') },
        // { id: 5, label: t('newDeveloper.EmailServicemen'), onPress: () => handleOptionPress('EMAIL') },
        { id: 6, label: t('newDeveloper.ChatwithServicemen'), onPress: () => handleOptionPress('CHAT') },
    ];

    const handleThreeDotPress = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    const sendEmail = async (emailAddress:string) => {
        const mailtoLink = `mailto:${emailAddress}`;
        try {
          const supported = await Linking.canOpenURL(mailtoLink);
          if (!supported) {
            Alert.alert('Error', 'Email client is not supported on this device');
          } else {
            await Linking.openURL(mailtoLink);
          }
        } catch (err) {
          console.error('An error occurred', err);
          Alert.alert('Error', 'An unexpected error occurred');
        }
      };

    const handleOptionPress = (option: string) => {
        console.log(`Selected option: ${option}`);
        setDropdownVisible(false);
        if (option === 'EDIT') {
            //editAnnouncementPageRedirect(item)
        }
        if (option === 'DELETE') {

            Alert.alert(
                'Confirmation',
                t('newDeveloper.DeleteServiceMen'),
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                           deleteServiceMen(item.id)
                        },
                    },
                ],
                { cancelable: false }
            );
        }

        if (option === 'PREVIEW') {
            handleNavigateToDetailsPage(item.id)
        }
        if (option === 'CALL') {
            let phoneNumber = `tel:${item.phone}`;
            Linking.canOpenURL(phoneNumber)
                .then((supported) => {
                    if (!supported) {
                        Alert.alert('Phone number is not available');
                    } else {
                        return Linking.openURL(phoneNumber);
                    }
                })
                .catch((err) => console.log(err));
        }
        if (option === 'EMAIL') {
            sendEmail(item.email)
        }
        if (option === 'EDIT') {
            editServiceMen(item.id)
        }
        if (option === 'CHAT') {
            Alert.alert('Chat servicemen not working, will work after chat integration')
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleThreeDotPress} style={styles.iconContainer}>
                <Icon name="ellipsis-h" size={24} color="grey" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isDropdownVisible}
                onRequestClose={() => setDropdownVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => setDropdownVisible(false)}
                    />
                    <View style={styles.dropdown}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={item.onPress} style={styles.option}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    iconContainer: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 10,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default ActionMenuServiceMen;
