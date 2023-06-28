import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';

const ClientDiaryList = () => {
    const [listItems, setListItems] = useState([]);
    const cameraRef = useRef(null);

    const addDiary = () => {
        Alert.alert(
        '다이어리 작성',
        '다이어리 작성을 시작하시겠습니까?',
        [
            {
            text: '시작',
            onPress: () => launchCamera(),
            },
            {
            text: '취소',
            style: 'cancel',
            },
        ],
        { cancelable: true }
        );
    };

    const deleteDiary = (index) => {
        const updatedList = [...listItems];
        updatedList.splice(index, 1);
        setListItems(updatedList);
    };

    const renderDiaryItem = ({ item, index }) => {
        return (
          <View style={styles.personItem}>
            <Text>Name: {item.name}</Text>
            <Text>Date: {item.date}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteDiary(index)}>
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        );
      };

      const launchCamera = async () => {
        if (cameraRef.current) {
          const options = {
            quality: RNCamera.Constants.VideoQuality.high,
          };
    
          try {
            const data = await cameraRef.current.recordAsync(options);
            console.log('동영상 응답:', data);
    
            // 동영상 파일을 갤러리에 저장
            const directoryPath = RNFS.DocumentDirectoryPath;
            const fileName = `video_${Date.now()}.mp4`;
            const filePath = `${directoryPath}/${fileName}`;
    
            await RNFS.moveFile(data.uri, filePath);
            console.log('동영상 저장 경로:', filePath);
    
            // 리스트에 동영상 정보 추가
            const newDiary = { name: '새로운 동영상', date: new Date().toLocaleDateString(), video: filePath };
            setListItems([...listItems, newDiary]);
          } catch (error) {
            console.log('카메라 오류:', error);
          }
        }
      };

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.title}>일기장</Text>
            </View>
            <FlatList data={listItems} renderItem={renderDiaryItem} keyExtractor={(item, index) => index.toString()} />
            <TouchableOpacity style={styles.addButton} onPress={addDiary}>
              <Text style={styles.addButtonLabel}>+</Text>
            </TouchableOpacity>
    
            <View style={styles.cameraContainer}>
              <RNCamera ref={cameraRef} style={styles.camera} />
            </View>
          </View>
        </SafeAreaView>
      );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 50, // 버튼 높이만큼 아래 여백 추가
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        textAlign:"center",
        justifyContent: "center",
    },
    personItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#A9C3D0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonLabel: {
        fontSize: 24,
        color: 'white',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    stopButton: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 16,
    },
    stopButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ClientDiaryList;
