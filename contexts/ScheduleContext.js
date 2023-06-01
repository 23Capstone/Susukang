import React from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const ScheduleContext = createContext();

export const ScheduleContextProvider = ({children}) => {
  const [schedules, setSchedules] = useState([
    {
      id: uuidv4(),
      title: 'Test1',
      date: '2023-05-17',
      time: '12:27',
    },
  ]);

  const onCreate = ({title, date, time}) => {
    const schedule = {
      id: uuidv4(),
      title,
      date,
      time,
    };
    setSchedules([schedule, ...schedules]);
  };

  const onModify = modified => {
    //id가 일치하면 교체, 그렇지 않으면 유지
    const nextSchedules = schedules.map(schedule =>
      schedule.id === modified.id ? modified : schedule,
    );
    setSchedules(nextSchedules);
  };

  const onRemove = id => {
    const nextSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(nextSchedules);
  };

  return (
    <ScheduleContext.Provider value={{schedules, onCreate, onModify, onRemove}}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;