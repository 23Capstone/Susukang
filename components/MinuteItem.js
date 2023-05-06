import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const MinuteItem = ({
  id,
  title,
  department,
  date,
  content,
  onRemove,
  datas,
}) => {
  const navigation = useNavigation();

  const onPress = () => {};

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.Icon}>
        <Icon name="arrow-circle-down" size={30} color="#1976D2" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('openFile', {
              id: id,
              title: title,
              department: department,
              date: date,
              content: content,
              datas: datas,
            })
          }>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.bottomData}>
            <Text style={styles.department}>{department}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightIcon} onPress={onPress}>
        <TouchableOpacity style={[styles.summary, {marginRight: 5}]}>
          <Icon name="edit" size={30} />
          <Text style={styles.summaryText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.summary, {marginRight: 5}]}>
          <Icon name="wysiwyg" size={30} color="#C0C0C0" />
          <Text style={styles.summaryText}>요약</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summary} onPress={() => onRemove(id)}>
          <Icon name="delete" size={30} color="red" />
          <Text style={styles.summaryText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
  },
  Icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 50,
  },
  rightIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#212121',
  },
  bottomData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 12,
  },
});

export default MinuteItem;