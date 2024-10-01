import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'

const SearchInput = ({title, placeholder, value, handleChangeText, otherStyles, keyboardType}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
      <View className="w-full space-x-4 flex-row items-center focus:border-secondary  h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl">
        <TextInput className="flex-1 text-white text-base font-pregular"
          placeholder={placeholder}
          value={value}
          placeholderTextColor='#CDCDE0'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
         />
        <TouchableOpacity>
          <Image source={icons.search} className="w-5 h-5" resizeMode='contain' />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput
