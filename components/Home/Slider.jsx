import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, FlatList, View, Image, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../components/firebase';

const SLIDE_INTERVAL = 3000; // 3 seconds for each slide

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    GetSlider();
  }, []);

  useEffect(() => {
 
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderList.length);
    }, SLIDE_INTERVAL);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [sliderList.length]);

  useEffect(() => {
    // Scroll to the current index in the FlatList
    if (sliderList.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const GetSlider = async () => {
    try {
      const snapshot = await getDocs(collection(db, "slider"));
      const sliders = snapshot.docs.map((doc) => doc.data());
      setSliderList(sliders);
    } catch (error) {
      console.error("Error fetching sliders: ", error);
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        ref={flatListRef}
        data={sliderList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
