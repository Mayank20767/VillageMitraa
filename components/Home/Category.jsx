import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { db } from '../../components/firebase'
import {green,darkGreen} from '../../components/Colors';


export default function Category({category}) {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory,setSelectedCategory]= useState('Schemes');

    useEffect(() => {
        GetCategories();
    }, [])

    const GetCategories = async () => {
        setCategoryList([]);
        const snapshot = await getDocs(collection(db, 'category'));
        snapshot.forEach((doc) => {
            // console.log(doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data()])
        })
    }

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'montserrat-bold', fontSize: 20 }}>Category</Text>
            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        onPress={()=>{
                            setSelectedCategory(item.name);
                            category(item.name);
                        }}
                    style={{
                        flex:1
                    }}>
                        <View style={[styles.container,
                            selectedCategory==item.name && styles.selectedCategoryContainer]}>
                            <Image
                                source={{ uri: item?.imageUrl }}
                                style={{ width: 40, height: 40 }}
                            />
                        </View>
                        <Text style={{
                            textAlign:'center',
                            fontFamily:'outfit'
                        }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#AFE1AF',
        padding:15,
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#AFE1AF',
        margin:5
    },
    selectedCategoryContainer:{
        backgroundColor:green,
        borderColor:green
    }
})
