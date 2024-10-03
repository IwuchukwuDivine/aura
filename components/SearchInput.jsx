import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialValue}) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialValue || '')
  return (
      <View className="w-full space-x-4 flex-row items-center focus:border-secondary  h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl">
        <TextInput className="flex-1 text-white text-base font-pregular"
          placeholder='Search for a video topic'
          value={query}
          placeholderTextColor='#CDCDE0'
          onChangeText={(e) => setQuery(e)}
         />
        <TouchableOpacity
          onPress={() => {
            if(query){
              if (pathName.startsWith('/search')) {
                router.setParams({query})
              }else{
                router.push(`/search/${query}`)
              }
            }
          }}
        >
          <Image source={icons.search} className="w-5 h-5" resizeMode='contain' />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput
