import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'

const FormField = ({title, placeholder, value, handleChangeText, otherStyles, keyboardType}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles} w-full`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full flex-row items-center focus:border-secondary  h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl">
        <TextInput className="flex-1 text-white font-psemibold text-base"
          placeholder={placeholder}
          value={value}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
         />
        {
          title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image onProgress={() => setShowPassword(!showPassword)} className="w-6 h-6" resizeMode='contain' source={showPassword ? icons.eyeHide : icons.eye } />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})