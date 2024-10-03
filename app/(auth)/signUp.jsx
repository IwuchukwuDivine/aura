import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomBtn from '../../components/CustomBtn'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createUser } from '../../lib/appwrites'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({email: '', password: '', userName: ''})

  const sumbit = async() => {
    if(!form.userName || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    setIsLoading(true)
    try{
      const response = await createUser(form.email, form.password, form.userName);
      if(response){
        setUser(result);
        setIsLoggedIn(true);
        router.replace('/Home')
      }
    }catch(err){
      console.log(err)
      Alert.alert('Error', err.message)
    }finally{
      setIsLoading(false)
    } 
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="items-start my-6 justify-center min-h-[75vh] w-full px-4">
          <Image className="w-[115px] h-[35px]" resizeMode='contain' source={images.logo} />
          <Text className="text-3xl text-white text-semibold font-psemibold mt-10">Sign up</Text>
          <FormField
            title={'Username'}
            value={form.userName}
            otherStyles = "mt-7"
            handleChangeText={(e) => setForm({...form, userName: e})}
            keyboardType={'email-address'}
            placeholder={'Your unique username'}
           />
          <FormField
            title={'Email'}
            value={form.email}
            otherStyles = "mt-7"
            handleChangeText={(e) => setForm({...form, email: e})}
            keyboardType={'email-address'}
            placeholder={'Enter your email'}
           />
          <FormField
            title={'Password'}
            value={form.password}
            otherStyles = "mt-7"
            handleChangeText={(e) => setForm({...form, password: e})}
            placeholder={'Enter your password'}
           />
           <CustomBtn
            title={'Sign Up'}
            handlePress={sumbit}
            containerStyles={"mt-7 w-full"}
            isLoading={isLoading}
           />
           <View className="justify-center w-full flex-row pt-5 gap-2">
            <Text className="text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link href="/login" className='text-secondary font-psemibold text-lg'>Login</Link>
           </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})