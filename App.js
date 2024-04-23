import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import FillOutSurvey from './Components/FillOutSurvey';
import ViewSurveyResults from './Components/ViewSurveyResults';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FillOutSurvey'>
        <Stack.Screen name='FillOutSurvey' component={FillOutSurvey} />
        <Stack.Screen name='ViewSurveyResults' component={ViewSurveyResults} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
