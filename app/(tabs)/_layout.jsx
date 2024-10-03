import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'
const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        resizeMode='contain' 
        source={icon} 
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color}}>
        {name}
      </Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
    <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#cdcde0',
        tabBarStyle: {
          borderTopWidth: 1,
          backgroundColor: '#161622',
          borderTopColor: '#232533',
          height: 84
        }
      }}
    >
      <Tabs.Screen 
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.home} color={color} name={'Home'} focused={focused} />
          )
        }}
         />
      <Tabs.Screen 
        name="Create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.plus} color={color} name={'Create'} focused={focused} />
          )
        }}
         />
      <Tabs.Screen 
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.profile} color={color} name={'Profile'} focused={focused} />
          )
        }}
         />
    </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})