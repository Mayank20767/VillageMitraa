import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider'; 
import ListByCategory from '../../components/Home/ListByCategory'; 
import { useUserContext } from '../../components/UserContext';


const HomePage = () => {
  const { fullname = '' } = useLocalSearchParams(); 
  const { userData } = useUserContext();

  console.log("HomePage received fullname:", fullname);
  console.log("HomePage received useUserContext:", userData); 


  return (
    <View style={{ padding: 20, marginTop: 27 ,flex:1}}>
      <Header firebaseUser={{ fullName: fullname }} /> 
      <Slider />
      <ListByCategory/>
    </View>
  );
};

export default HomePage;
