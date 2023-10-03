import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

export default function ModalComponent({ isVisible, onClose, buttonText}) {
    return (
        <Modal
            visible={isVisible}
            statusBarTranslucent={true}
            animationType={'none'}
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Pressable onPress={onClose}
                        style={styles.buttonClose}>
                        <Icons name="close" size={20} color="#fff" />
                    </Pressable>
                    <Text style={styles.textHeading}>Cancel</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>Are you sure you wants to cancel ?</Text>
                    <Pressable onPress={onClose} style={styles.Btn}>
                        <Text style={styles.btnText}>{buttonText}</Text>
                    </Pressable>
                </View>
                
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        width: 250,
        height: 170,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
    },
    Btn: {
        backgroundColor: '#EEC217',
        width: 80,
        height: 40,
        alignItems: "center",
        justifyContent: "center", borderRadius: 5,
        margin: 10
    },
    btnText: {
        fontSize: 14,
        color: '#1C1C1C',
        fontFamily: 'Poppins-Regular'
    },
    buttonClose: {
        width: 25,
        height: 25,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#4985BB',
        position: 'absolute',
        right: -5,
        top: -5,
    },
    textHeading: {
        fontSize: 20,
        color: '#1C1C1C',
        fontFamily: 'Poppins-Regular'
    }

});
