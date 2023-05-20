import React, {useState, useContext} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScheduleContext from '../contexts/ScheduleContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dialog from 'react-native-dialog';

const CalenderItem = ({schedule}) => {
  const {id, title, date, time} = schedule;
  const [visible, setVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [itemTitle, setItemTitle] = useState(title);
  const [itemDate, setItemDate] = useState(date);
  const [itemTime, setItemTime] = useState(time);
  const [mode, setMode] = useState('date');

  const {onRemove} = useContext(ScheduleContext);
  const {onModify} = useContext(ScheduleContext);

  const formatDate = selectedDate => {
    if (!selectedDate) return '';
    if (selectedDate === date) return date;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  };

  const formatTime = selectedTime => {
    if (!selectedTime) return '없음';
    if (selectedTime === time) return time;
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setItemTime(time);
    setItemDate(date);
    setItemTitle(title);
    setVisible(false);
  };

  const handleOk = () => {
    onModify({
      id: id,
      title: itemTitle,
      date: itemDate,
      time: itemTime,
    });
    setVisible(false);
    setItemTime(itemTime);
    setItemDate(itemDate);
    setItemTitle(itemTitle);
  };

  const onConfirm = selectedDate => {
    setPickerVisible(false);
    if (mode === 'date') {
      setItemDate(formatDate(selectedDate));
      console.log(itemDate);
    } else {
      setItemTime(formatTime(selectedDate));
      console.log(itemTime);
    }
  };

  const onCancel = () => {
    setPickerVisible(false);
  };

  const onPressDate = () => {
    setMode('date');
    setPickerVisible(true);
  };

  const onPressTime = () => {
    setMode('time');
    setPickerVisible(true);
  };

  return (
    <Pressable style={styles.block} onPress={showDialog}>
      <View style={styles.titleDateBlock}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.delete}>
          <Text style={styles.time}>시간 {time}</Text>
          <TouchableOpacity
            style={styles.deleteIocn}
            onPress={() => onRemove(schedule?.id)}>
            <Icon name="clear" size={23} color="#cd5c5c" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>일정 수정</Dialog.Title>
          <Dialog.Input
            placeholder="일정"
            onChangeText={setItemTitle}
            value={itemTitle}
          />
          <Pressable onPress={onPressDate} style={styles.modalButton}>
            <Text style={styles.modalText}>날짜</Text>
            <Text style={styles.dateTimeText}>{itemDate}</Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable onPress={onPressTime} style={styles.modalButton}>
            <Text style={styles.modalText}>시간</Text>
            <Text style={styles.dateTimeText}>{itemTime}</Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={pickerVisible}
            mode={mode}
            //date={itemTime}
            onConfirm={onConfirm}
            onCancel={onCancel}
            display="spinner"
            is24Hour={true}
          />
          <Dialog.Button label="취소" onPress={handleCancel} />
          <Dialog.Button label="확인" onPress={handleOk} />
        </Dialog.Container>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderTopColor: '#1976D2',
    borderTopWidth: 3,
  },
  titleDateBlock: {
    flex: 1,
    marginLeft: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    marginTop: 2,
    fontSize: 13,
    color: 'gray',
  },
  //   Icon: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     width: 24,
  //     height: 24,
  //     borderRadius: 12,
  //     borderColor: 'gray',
  //   },
  deleteIocn: {
    alignItems: 'flex-end',
    marginLeft: 15,
  },
  time: {
    color: 'black',
    fontWeight: 'bold',
  },
  delete: {
    flexDirection: 'row',
  },
  modalButton: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalText: {
    color: 'black',
    fontSize: 15,
  },
  dateTimeText: {
    marginRight: 15,
    color: 'black',
  },
});

export default CalenderItem;
