import { Alert, FlatList, RefreshControl, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrites'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const [isRefreshing, setRefreshing] = useState(false)
  const {data: Posts, refetch} = useAppWrite(getAllPosts)
  const {data: LatestPost} = useAppWrite(getLatestPosts)
  const onRefresh = async() => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={Posts}
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row mb-6 justify-between items-center">
              <View >
                <Text className="text-sm font-pmedium text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">Deevyn</Text>
              </View>
              <View>
                <Image className="w-9 h-10" resizeMode='contain' source={images.logoSmall} />
              </View>
            </View>
            <SearchInput placeholder={'Search for a video topic'} />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg text-gray-100 font-pregular mb-3">Latest Videos</Text>
              <Trending posts={LatestPost} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={'No Videos Found'}
            subtitle={'Be the first one to upload a video'}
          />
        )}
        refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
       />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})