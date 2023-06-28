import { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    FlatList, 
    SafeAreaView,
    Alert,
    TextInput,
    Button,
    Modal 
} from 'react-native';
import { compat } from 'deprecated-react-native-prop-types';
import Swipeable from 'react-native-swipeable';
/*
const propTypes = {
    ...compat(View.propTypes),
    // 나머지 propTypes 정의
};
*/
const PersonList = () => {
    const [listItems, setListItems] = useState([]);
    const [inputKey, setInputKey] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const fetchPersonDataById = (key) => {
        // 여기에서 실제 데이터베이스에서 id를 기반으로 데이터를 조회하는 로직을 구현해야 합니다.
        // 예시를 위해 임의의 데이터를 반환하는 Promise를 사용합니다.
        return new Promise((resolve, reject) => {
          // 데이터베이스 조회 로직
            const database = {
                id:'test',
                name: 'John',
                gender: 'Male',
                age: '20',
                date: '2023-11-12'
            };
            const personData = database[key];
          // 조회된 데이터를 resolve로 반환합니다.
            if (personData) {
            // 데이터가 존재하는 경우, 조회된 데이터를 resolve로 반환합니다.
            resolve(personData);
            } else {
            // 데이터가 존재하지 않는 경우, reject로 처리합니다.
            reject(new Error('Person data not found'));
            }
        });
    };
    const addPerson = async () => {
        try {
            // 아이디를 기반으로 데이터베이스에서 정보를 가져옵니다.
            const personData = await fetchPersonDataByKey(inputKey);
        
              // 가져온 정보를 바탕으로 리스트 아이템을 생성합니다.
            const newItem = {
                id: inputKey,
                name: personData.name,
                age: personData.age,
                gender: personData.gender,
                date: personData.date,
            };
        
            setListItems([...listItems, newItem]);
            setInputKey('');
            setModalVisible(false);
            
            } catch (error) {
            console.error('사람 데이터를 가져오는 중 오류 발생:', error);
            }
        };
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Year: {item.year}</Text>
        </View>
    );    
    const openModal = () => {
        setModalVisible(true);
    };
        
    const closeModal = () => {
        setModalVisible(false);
    };
    const confirmDeletePerson = (index) => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this person?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                    onPress: () => {
                        // 삭제 버튼 닫기
                        const swipeRef = swipeableRefs[index];
                        if (swipeRef) {
                        swipeRef.recenter();
                        }
                    },
                },
                {
                    text: 'OK',
                    onPress: () => deletePerson(index),
                },
            ],
            { cancelable: true, onDismiss: () => onDismissDeleteConfirmation(index) }
        );
    };
    
    const deletePerson = (index) => {
        const updatedList = [...listItems];
        updatedList.splice(index, 1);
        setListItems(updatedList);
    };
    const handleModalClose = () => {
        setModalVisible(false);
        setListItems({ date: null, name: '', time: '' });
    };
    

    const onDismissDeleteConfirmation = (index) => {
        // 삭제 확인 대화 상자가 닫힐 때 호출되는 콜백 함수
        const swipeRef = swipeableRefs[index];
        if (swipeRef) {
            swipeRef.recenter();
        }
    };
    const onSwipeableWillOpen = (index) => {
        setOpenedIndex(index);
    };  
    const onSwipeableWillClose = () => {
        setOpenedIndex(null);
    };
    const swipeableRefs = {};

    const renderPersonItem = ({ item, index }) => {
        const rightButtons = [
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDeletePerson(index)}
                key={`delete_${index}`}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        ];
        const swipeableProps = {
            rightButtons,
            rightButtonWidth: 100,
            onSwipeableWillOpen: () => onSwipeableWillOpen(index),
            onSwipeableWillClose: onSwipeableWillClose,
            useNativeDriver: false
        };

        return (
            <Swipeable {...swipeableProps}>
                <View style={styles.personItem}>
                    {/* 리스트 아이템 내용 */}
                    <Text>Name: {item.name}</Text>
                    <Text>Age: {item.age}</Text>
                    <Text>Gender: {item.gender}</Text>
                    <Text>Date: {item.date}</Text>
                </View>
            </Swipeable>
        );
    };

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>내담자 리스트</Text>
                </View>
                <FlatList
                    data={listItems}
                    renderItem={renderPersonItem}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* 추가 버튼 */}
                <TouchableOpacity style={styles.addButton} onPress={openModal}>
                    {/* 버튼 내용 */}
                    <Text style={styles.addButtonLabel}>+</Text>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                style={styles.input}
                                placeholder="Enter key"
                                value={inputKey}
                                onChangeText={setInputKey}
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButton} onPress={addPerson}>
                                        <Text style={styles.modalButtonText}>Add</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                                        <Text style={styles.modalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    modalButton: {
        marginLeft: 8,
    },
    modalButtonText: {
        color: '#A9C3D0',
        fontWeight: 'bold',
    },
    IDinput: {
        flex: 1,
        marginRight: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 50, // 버튼 높이만큼 아래 여백 추가
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
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#E9EFFA',
        borderRadius: 10,
    },
    deleteButton: {
        flex:1,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#A9C3D0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#A9C3D0',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // 그림자 효과
    },
    addButtonLabel: {
        fontSize: 40,
        color: 'white',
        textAlign: "center",
        justifyContent: 'center',
    },
});

export default PersonList;
