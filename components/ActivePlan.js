import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutAnimation } from 'react-native'


const active_plans = [
    {
        id: 1,
        name: "Safe # 01",
        expiry_date: '3 months left until automatic renewal',
        data: "500GB left",
        img: require('../assets/images/onboardimg1.png'),
    },
    {
        id: 2,
        name: "Safe # 02",
        expiry_date: '3 months left until automatic renewal',
        data: "500GB left",
        img: require('../assets/images/onboardimg1.png'),
    }
];

export default function ActivePlan() {
    const layoutAnimConfig = {
        duration: 300,

        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
        },
        delete: {
            duration: 100,
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
        },
    };
    const [data_active, setData] = useState(active_plans);
    const removeItem = (id) => {
        let arr = data_active.filter(function (item) {
            return item.id !== id
        })
        setData(arr);
        LayoutAnimation.configureNext(layoutAnimConfig)
    };
    return (
        <View style={styles.container}>
            {data_active.map((item, index) => (
                <View style={styles.parcelsafe} key={index}>
                    <View style={styles.parcelsafeimageBox}>
                        <Image style={styles.parcelsafeImage} source={item.img} />
                    </View>
                    <View style={styles.parcelsafedetailBox}>
                        <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'Century-Gothic', fontWeight: '600' }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, color: "#fff", fontFamily: 'Poppins-Regular' }}>{item.expiry_date}</Text>
                        <Text style={{ fontSize: 12, color: "#fff", fontFamily: 'Poppins-Regular' }}>{item.data}</Text>
                        <TouchableOpacity style={styles.parcelsafeBtn} onPress={() => removeItem(item.id)} >
                            <Text style={{ fontSize: 12, color: "#000" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parcelsafe: {
        flexDirection: 'row',
        backgroundColor: '#4985BB',
        borderColor: '#373C44',
        borderWidth: 1,
        borderRadius: 20,
        height: 140,
        marginTop: 20

    },
    parcelsafeimageBox: {
        alignItems: 'center',
        backgroundColor: '#ffff',
        width: '30%',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        margin: 10
    },
    parcelsafeImage: {
        width: 50,
        height: 100,
        position: "absolute",
        bottom: 0
    },
    parcelsafedetailBox: {
        width: '70%',
        paddingLeft: 20,
        paddingRight: 20,
        padding: 8,
        position: 'relative'
    },
    parcelsafeBtn: {
        width: "40%",
        borderRadius: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEC217",
        borderColor: "#858585",
        borderWidth: 1,
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})