import Background from '../components/Background';
import { Text, View } from 'react-native';
import Btn from '../components/Btn';
import { green, darkGreen } from '../components/Colors';
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 75 }}>
        <Text style={{ color: 'white', fontSize: 55, fontFamily: 'montserrat-bold' }}>
          Welcome
        </Text>
        <Text style={{ color: 'white', fontSize: 32, marginBottom: 40, fontFamily: 'outfit-regular' }}>
          To VillageMitra
        </Text>
      </View>
      <View>
        <Btn
          bgColor={green}
          textColor="white"
          btnLabel="Login"
          fontFamily="montserrat-regular"
          Press={() => router.push('/login')}
        />
        <Btn
          bgColor="white"
          textColor={darkGreen}
          btnLabel="Signup"
          Press={() => router.push('/login/Signup')} 
        />
      </View>
    </Background>
  );
};

export default Welcome;
