import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-elements';
import appColors from '@src/theme/appColors';
import { useValues } from '../../../../../App';

interface PanelCardProps {
    title: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
    discount: string;
    rating: number;
    reviews: number;
    onEdit: () => void;
    onDelete: () => void;
}

const PanelCard: React.FC<PanelCardProps> = ({
    title,
    imageUrl,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    onEdit,
    onDelete,
}) => {
    const { isDark, t, currSymbol } = useValues();
    return (
        <View style={[styles.card, {
            backgroundColor: isDark ? appColors.darkCardBg : appColors.white,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
        }]}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.discount}>{discount}</Text>
                <Text style={[styles.title, { color: isDark ? appColors.white : appColors.darkText }]}>{title}</Text>
                <View style={[styles.ratingContainer, {
                    backgroundColor: isDark ? appColors.darkCardBg : appColors.white,

                }]}>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={rating}
                        style={styles.rating}
                        tintColor={isDark ? appColors.darkCardBg : appColors.white}
                    />
                </View>
                <Text style={[styles.reviews, { color: isDark ? appColors.white : appColors.darkText }]}>({reviews})</Text>
                <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: isDark ? appColors.white : appColors.darkText }]}>{currSymbol} {price}</Text>
                    <Text style={[styles.originalPrice, { color: isDark ? appColors.white : appColors.darkText }]}>{currSymbol} {originalPrice}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onEdit}>
                    <Icon name="edit" size={24} color="blue" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Icon name="delete" size={24} color="red" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 15,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 40,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    discount: {
        backgroundColor: 'green',
        color: 'white',
        padding: 1,
        borderRadius: 3,
        alignSelf: 'flex-start',
        fontSize: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    },
    reviews: {
        fontSize: 10,
        marginLeft: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#666',
        marginLeft: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
        padding: 1,
        borderRadius: 5,
    },
});

export default PanelCard;