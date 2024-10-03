import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.8
  },
  1: {
    scale: 1.1
  }
};

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.8
  }
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
        source={{
          uri: item.video,
        }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        className="w-52 h-72 mt-3 rounded-[35px] bg-white/10" 
        onPlaybackStatusUpdate={status => {
          if(status.didJustFinish) setPlay(false)
        } }
      />
      ) : (
        <TouchableOpacity 
          onPress={() => setPlay(true)} 
          activeOpacity={0.7} 
          className="relative justify-center items-center"
        >
          <ImageBackground 
            resizeMode='cover'
            className="w-52 h-72 my-5 rounded-[35px] overflow-hidden shadow-lg shadow-black/40"
            source={{ uri: item.thumbnail }}
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(null);

  // sets the active item to the first visible item
  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      horizontal
      contentOffset={{ x: 170 }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
      }}
    />
  );
};

export default Trending;
