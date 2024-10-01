import { View, Text, Image } from 'react-native'
import React from 'react'
import { images, icons } from '../constants'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const VideoCard = ({video}) => {
  const [play, setPlay] = useState(false)
  const handlePlay = () => {
    console.log(video)
  }
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-1 flex-row">
          <View className="h-[46px] w-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image resizeMode='cover' className="w-full h-full rounded-lg"  source={{uri: video.users.avatar}} />
          </View>
          <View className='ml-3 gap-y-1 flex-1 justify-center'>
            <Text numberOfLines={1} className="text-sm text-white font-psemibold overflow-hidden text-ellipsis">{video.title}</Text>
            <Text numberOfLines={1} className="text-xs text-gray-100 font-pregular">{video.users.username}</Text>
          </View>
        </View>
        <View className="pt-2">
          <Image className="w-5 h-5" resizeMode='contain' source={icons.menu} />
        </View>
      </View>
      {
        play ? (
          <Text>Playing</Text>
        ): (
          <TouchableOpacity
             activeOpacity={0.7} 
             onPress={() => handlePlay(video)}
             className="w-full relative rounded-xl h-60 mt-3 justify-center items-center">
            <Image className="w-full h-full rounded-xl" resizeMode='cover' source={{uri: video.thumbnail}} />
            <Image source={icons.play} resizeMethod='contain' className='w-12 h-12 absolute' />
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default VideoCard