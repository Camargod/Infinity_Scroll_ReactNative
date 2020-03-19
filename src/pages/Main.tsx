import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, View, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';


function Item({ item }) {
    return (
        <View style={styles.item}>
        <Text style={styles.title}>{item}</Text>
        </View>
    );
  }

export default function Main()
{
    let [mock,setMock] = useState([]);

    let [isLoading, setIsloading] = useState(true);
    let [isRequesting, setIsRequesting] = useState(true);
    useEffect(()=>
    {
        getNames(mock.length).then(e =>{setIsloading(false); setMock([...e]); setIsRequesting(false)});
    },[]);
    while(isLoading)
    {
        return(
            <>
                <Text>Carregando</Text>
            </>
        )
    }
    return(
        <>
        <SafeAreaView style={styles.container}>
            <FlatList data={mock} renderItem={({ item }) => <Item item={item.name} />}  onEndReached=
            {
                ()=>
                {
                    if(!isRequesting)
                    {
                        getNames(mock.length).then(e =>{setMock(mock.concat(e))})
                    }
                }
            } onEndReachedThreshold={0.5} />
        </SafeAreaView>
        </>
    );
}

async function getNames(indexList : number)
{
    const response = await (await fetch("http://names.drycodes.com/10")).json();
    let returnResponse = [];
    response.map((e,index)=>{
        returnResponse.push({id:`${index + indexList }`,name:e});
    });
    return returnResponse;
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });