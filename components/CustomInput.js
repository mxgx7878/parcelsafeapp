// CustomInput.js
import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#696969",
    borderRadius: 50,
    width: "100%",
    height: 45,
    marginBottom: 15,
    padding: 10,
    paddingLeft: 20,
    color: '#1C1C1C',
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 20
  },

})

export default CustomInput