import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomBtn from './CustomBtn'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="w-full justify-center items-center px-4">
      <Image resizeMode='contain' className="w-[270px] h-[215px]" source={images.empty} />
      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold mt-2 text-white">{subtitle}</Text>
      <CustomBtn containerStyles={"mt-7 w-full"} title={'Create Video'} handlePress={() => router.push('/Create')} />
    </View>
  )
}

export default EmptyState