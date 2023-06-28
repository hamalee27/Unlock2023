import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, Alert, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const CalendarScreen = () => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({
    '2023-06-01': [{ id: '1', title: 'Meeting 1', name: 'Lee', hour: '23:00' }],
    '2023-06-10': [{ id: '2', title: 'Event 1', name: 'Lee', hour: '23:00' }],
    '2023-06-20': [
      { id: '3', title: 'Event 2', name: 'Lee', hour: '23:00' },
      { id: '4', title: 'Event 3', name: 'Lee', hour: '22:00' },
    ],
    '2023-07-01': [{ id: '5', title: 'Event 1', name: 'Lee', hour: '23:00' }],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [diaryData, setDiaryData] = useState({ date: null, name: '', time: '' });

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  

  const markedDates = {};

  Object.keys(events).forEach((date) => {
    if (events[date].length > 0) {
      markedDates[date] = { marked: true }; // 해당 날짜에 일정이 있는 경우만 표시
    }
  });

  const renderSwipeableItem = ({ item }) => {
    const handleDeleteEvent = () => {
      Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedEvents = { ...events };
            const eventDate = events[selectedDate];
            const filteredEvents = eventDate.filter((event) => event.id !== item.id);
            updatedEvents[selectedDate] = filteredEvents;
            setEvents(updatedEvents);
          },
        },
      ]);
    };
  
    const rightSwipeActions = () => (
      <TouchableOpacity onPress={handleDeleteEvent} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  
    return (
      <Swipeable renderRightActions={rightSwipeActions}>
        <TouchableOpacity style={styles.agendaItem}>
          <Text>{item.title}</Text>
          <Text>{item.name}</Text>
          <Text>{item.hour}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const handleAddEvent = () => {
    setModalVisible(true);
    setTimePickerVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setDiaryData({ date: null, name: '', time: '' });
  };

  const handleSaveEvent = () => {
    if (diaryData.date && diaryData.name && diaryData.time) {
      const updatedEvents = { ...events };
      const newEvent = { id: Date.now().toString(), title: diaryData.name, name: 'Lee', hour: diaryData.time };
      if (updatedEvents[diaryData.date]) {
        updatedEvents[diaryData.date].push(newEvent);
      } else {
        updatedEvents[diaryData.date] = [newEvent];
      }
      setEvents(updatedEvents);
      handleModalClose();
    } else {
      Alert.alert('Missing Information', 'Please enter all required information.');
    }
  };

  return (
    <SafeAreaView style={styles.calendar}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        hideExtraDays={true}
        hideDayNames={true}
        firstDay={1}
        enableSwipeMonths={true}
      />
      <View style={styles.agendaContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDate ? `Selected Date: ${selectedDate}` : 'No Date Selected'}
        </Text>
        {selectedDate && events[selectedDate] ? (
          <FlatList
            data={events[selectedDate]}
            renderItem={renderSwipeableItem}
            keyExtractor={(item) => item.id}
            horizontal={false}
          />
        ) : (
          <Text style={styles.noEventsText}>No events for selected date</Text>
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Add Event Modal */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>예약하기/일정추가</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Date"
                value={diaryData.date}
                onChangeText={(text) => setDiaryData({ ...diaryData, date: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={diaryData.name}
                onChangeText={(text) => setDiaryData({ ...diaryData, name: text })}
              />
            </View>
            {isTimePickerVisible && (
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedTime}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedTime(itemValue);
                    setDiaryData({ ...diaryData, time: itemValue });
                  }}
                  enabled={!selectedDate || !events[selectedDate] || !events[selectedDate].find(event => event.hour === selectedTime)}
                >
                  <Picker.Item label="Select Time" value={null} />
                  <Picker.Item label="09:00" value="09:00" />
                  <Picker.Item label="10:00" value="10:00" />
                  <Picker.Item label="11:00" value="11:00" />
                  <Picker.Item label="12:00" value="12:00" />
                  <Picker.Item label="13:00" value="13:00" />
                  <Picker.Item label="14:00" value="14:00" />
                  <Picker.Item label="15:00" value="15:00" />
                  <Picker.Item label="16:00" value="16:00" />
                  <Picker.Item label="17:00" value="17:00" />
                  <Picker.Item label="18:00" value="18:00" />
                  {/* Add more time options as needed */}
                </Picker>
              </View>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveEvent}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  calendar: {
    flex: 1,
  },
  agendaContainer: {
    flex: 1,
    padding: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noEventsText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  agendaItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#95C3ED',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#A9C3D0',
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  pickerContainer: {
    fontSize: 8,
    marginTop:5,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  pickerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default CalendarScreen;

