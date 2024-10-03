import { Alert, FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrites'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const query = useLocalSearchParams().query
  const {data: Posts, refetch} = useAppWrite(searchPosts, query)


  useEffect(() => {
    refetch()
  }, [query])
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={Posts}
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-sm font-pmedium text-gray-100">Search Results</Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialValue={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={'No Videos Found for this search query'}
            subtitle={'Be the first one to upload a video'}
          />
        )}
       />
    </SafeAreaView>
  )
}

export default Search
