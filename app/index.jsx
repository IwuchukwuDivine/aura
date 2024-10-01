
import {  Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomBtn from '../components/CustomBtn';
import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  // redirects the user to the log oin page if the user is already logged in
  if(!isLoading && isLoggedIn) return <Redirect href="/Home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="items-center justify-center min-h-[90vh] w-full px-4">
          <Image className="w-[130px] h-[84px]" resizeMode='contain' source={images.logo} />
          <Image className="max-w-[380px] w-full h-[300px]" resizeMode='contain' source={images.cards} />
          <View className="mt-5 relative">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with 
              <Text className="text-secondary-200"> Aura</Text>
            </Text>
            <Image className="absolute -bottom-2 right-20 w-[136px] h-[15px]" resizeMode='contain' source={images.path} />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>
          <CustomBtn containerStyles="mt-7 w-full" title={'Continue With Email'} handlePress={() => router.push('/login')} isLoading={isLoading} />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
