import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, Alert, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const CalendarScreen = () => {
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

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = `${year}-${month + 1}-${day < 10 ? '0' + day : day}`;
        setSelectedDate(selectedDate);
      }
    } catch (error) {
      console.log('Error selecting date:', error);
    }
  };

  return (
    <SafeAreaView style={styles.calendar}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>Select Date:</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={openDatePicker}>
          <Text style={styles.datePickerButtonText}>{selectedDate ? selectedDate : 'Select'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          hideExtraDays={true}
          hideDayNames={true}
          firstDay={1}
          enableSwipeMonths={true}
        />
      </View>
      <View style={styles.agendaContainer}>
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
            <Text style={styles.modalTitle}>Add Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={diaryData.name}
              onChangeText={(text) => setDiaryData({ ...diaryData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time"
              value={diaryData.time}
              onChangeText={(text) => setDiaryData({ ...diaryData, time: text })}
            />
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
});

export default CalendarScreen;

