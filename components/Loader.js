
import React from 'react';
import { StyleSheet, View, Modal, Image, Text } from 'react-native';

const Loader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
            source={require('../assets/orange_circles.gif')}
            style={styles.image}
            transition
          />
          <Text style={{ fontSize: 16, color: '#1C1C1C' }}>Please Wait</Text>
        </View>
      </View>

    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 60,
  },
  image: {
    width: 45,
    height: 45,
    margin: 10
  },

});