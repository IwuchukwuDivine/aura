import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomBtn from '../../components/CustomBtn'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createPost } from '../../lib/appwrites'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const {user} = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: '',
    thumbnail: '',
    prompt: '',
  })
  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' ?
        ['image/png', 'image/jpg', 'image/jpeg']:
        ['video/mp4', 'video/jpg']
    });
    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, thumbnail: result.assets[0]})
      }else if (selectType === 'video'){
        setForm({...form, video: result.assets[0]})
      }
    }
  }
  const submit = async () => {
    if(!form.prompt || !form.thumbnail || !form.title || !form.video){
      return Alert.alert('Error', "Please fill in all fields")
    }
    setUploading(true)
    try{
      await createPost({
        ...form, userId: user.$id
      })
      Alert.alert('Success', 'Post Uploaded successfully')
      router.push('/Home')
    }catch(error){
      Alert.alert('Error', error.message)
    }finally{
      setUploading(false)
      setForm({
        title: "",
        video: '',
        thumbnail: '',
        prompt: ''
      })
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-10">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>
        <FormField 
          handleChangeText={(text) => setForm({...form, title: text})} 
          value={form.title} 
          placeholder={'Give your video a catchy title'}
          otherStyles={'mt-10'}
          title={'Video Title'} 
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {
              form.video ? (
                <Video className="w-full h-64 rounded-2xl"  resizeMode={ResizeMode.COVER} shouldPlay source={{ uri: form.video.uri }} />
              ):(
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl items-center justify-center">
                  <View className="w-14 h-14 justify-center items-center border-dashed border border-secondary-100">
                    <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                  </View>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
        <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
        <TouchableOpacity onPress={() => openPicker('image')}>
            {
              form.thumbnail ? (
                <Image className="w-full h-64 rounded-2xl" resizeMode='cover' source={{uri: form.thumbnail.uri}} />
              ):(
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl items-center justify-center border-2 border-black-200 space-x-2 flex-row">
                  <Image source={icons.upload} className="w-5 h-5" resizeMode='contain' />
                  <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <FormField 
          handleChangeText={(text) => setForm({...form, prompt: text})} 
          value={form.prompt} 
          placeholder={'The prompt you used to create this video'}
          otherStyles={'mt-10'}
          title={'AI Prompt'} 
        />
        <CustomBtn handlePress={submit} isLoading={uploading} containerStyles={'mt-7'} title={'Submit and Plublish'} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({})