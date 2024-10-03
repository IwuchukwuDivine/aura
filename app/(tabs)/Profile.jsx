import { SafeAreaView, FlatList, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import {useGlobalContext} from '../../context/GlobalProvider'
import useAppWrite from '../../lib/useAppWrite'
import { getUserPost } from '../../lib/appwrites'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import { icons } from '../../constants'
import { signOut } from '../../lib/appwrites'
import { router } from 'expo-router'

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: Posts, refetch} = useAppWrite(getUserPost, user.$id)


  useEffect(() => {
    if(!user) {
      router.replace('/login')
    }
    refetch()
  }, [user])

  const logOut = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.replace('/login');
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
          <View className="mt-10 mb-12 px-4">
            <TouchableOpacity className="justify-end w-full flex-row mb-12" activeOpacity={0.7} onPress={logOut}>
              <Image resizeMode='contain' className="w-6 h-6" source={icons.logout} />
            </TouchableOpacity>
            <View className="justify-center  gap-4 items-center">
              <View className="rounded-lg justify-center items-center w-16 h-16 border border-secondary">
               <Image resizeMethod='cover' className="w-[90%] h-[90%] rounded-lg" source={{uri: user.avatar}} />
              </View>
              <Text className="text-white text-center text-xl font-psemibold">{user.username}</Text>
              <View className="flex-row gap-4 items-center">
                <View className='items-center gap-1'>
                  <Text className="font-psemibold text-white text-sm">{Posts.length}</Text>
                  <Text className="text-sm font-pmedium text-gray-100">Posts</Text>
                </View>
                <View className='items-center gap-1'>
                  <Text className="font-psemibold text-white text-sm">1.2K</Text>
                  <Text className="text-sm font-pmedium text-gray-100">Views</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={'No Videos Found'}
            subtitle={'You have not uploaded any videos'}
          />
        )}
       />
    </SafeAreaView>
  )
}

export default Profile
