import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Colors';
import Field from '../../components/Fields';
import googlelogo from '../../assets/images/googlelogo.png';
import { useRouter } from "expo-router";
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import { useSession, useClerk } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../components/firebase';
import { useUserContext } from '../../components/UserContext';


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { session } = useSession();
  const clerk = useClerk();
  const router = useRouter();
  // const [userData, setUserData] = useState(null);
  const { setUserData } = useUserContext();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password");
      return;
    }
  
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const { fullname, email: userEmail, contact } = userDoc.data();
  
        // Save to context
        setUserData({ fullname, email: userEmail, contact });
  
        // Navigate to Home
        router.push('/(tabs)/Home');
      } else {
        Alert.alert("Login failed", "Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      Alert.alert("An error occurred while logging in");
    }
  };

  const onPress = React.useCallback(async () => {
    try {
      if (session) {
        await clerk.signOut();
        console.log("Signed out existing session.");
      }
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
        console.log("New session created and set active.");
        router.push('/(tabs)/Home');
      } else {
        Alert.alert("Google Sign-In Failed", "Please try again.");
      }      
    } catch (err) {
      console.error('Error during OAuth:', JSON.stringify(err, null, 2));
    }
  }, [session, startOAuthFlow, clerk, router]);


  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text style={{
          color: 'white',
          fontSize: 64,
          marginVertical: 40,
          fontFamily: 'outfit-bold',
        }}>
          Login
        </Text>
        <View style={{
          backgroundColor: 'white',
          height: 700,
          width: 460,
          borderTopLeftRadius: 190,
          paddingTop: 100,
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 37,
            color: darkGreen,
            fontFamily: 'montserrat-bold',
          }}>
            Welcome Back
          </Text>
          <Text style={{
            color: 'grey',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={{
            alignItems: 'flex-end',
            width: '78%',
            paddingRight: 16,
            marginBottom: 30,
          }}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Forgot Password?
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={handleLogin}
          />
          <View>
            <Text style={{ marginLeft: 20, marginTop: 10, color: darkGreen, fontWeight: 'bold' }}>Sign up with Google</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
              onPress={onPress}
            >
              <Image
                source={googlelogo}
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/login/Signup')}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
