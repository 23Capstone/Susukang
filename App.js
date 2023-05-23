import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './contexts/UserContext';
import RootStack from './screens/RootStack';
import {FileContextProvider} from './contexts/FileContext';
import {SettingContextProvider} from './contexts/SettingContext';
import {SearchContextProvider} from './contexts/SearchContext';
import {ScheduleContextProvider} from './contexts/ScheduleContext';
import {KakaoContextProvider} from './contexts/KakaoContext';
import {STTContextProvider} from './contexts/STTContext';

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <ScheduleContextProvider>
          <KakaoContextProvider>
            <STTContextProvider>
              <FileContextProvider>
                <SettingContextProvider>
                  <NavigationContainer>
                    <RootStack />
                  </NavigationContainer>
                </SettingContextProvider>
              </FileContextProvider>
            </STTContextProvider>
          </KakaoContextProvider>
        </ScheduleContextProvider>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;
