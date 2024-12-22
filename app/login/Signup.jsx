// import React from 'react';
// import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
// import Background from '../../components/Background';
// import Btn from '../../components/Btn';
// import { darkGreen } from '../../components/Constants';
// import Field from '../../components/Fields';


// import { useRouter } from "expo-router"; 

// const Signup = () => {
//   const router = useRouter(); 

//   return (
//     <Background>
//       <View style={{ alignItems: 'center', width: 390 }}>
//         <Text style={{
//           color: 'white',
//           fontSize: 54,
//           fontWeight: 'bold',
//           marginTop: 55,
//         }}>
//           Register
//         </Text>
//         <Text style={{
//           color: 'white',
//           fontSize: 14,
//           fontWeight: 'bold',
//           marginBottom: 10,
//         }}>
//           Create a new account
//         </Text>
//         <View style={{
//           backgroundColor: 'white',
//           height: 700,
//           width: 460,
//           borderTopLeftRadius: 150,
//           paddingTop: 20,
//           alignItems: 'center',
//         }}>
//           <Field placeholder="Full Name" />
//           <Field placeholder="Email / Username" keyboardType={'email-address'} />
//           <Field placeholder="Contact Number" keyboardType={'number'} />
//           <Field placeholder="Password" secureTextEntry={true}/>
//           <Field placeholder="Confirm Password" secureTextEntry={true} />
//           <View style={{
//             display: 'flex',
//             flexDirection: 'row',
//             width: '80%',
//             paddingRight: 16
//           }}>
//             <Text style={{ color: 'grey', fontSize: 14 ,padding:10}}>
//               By signing in, you agree to our{''}
//             </Text>
//             <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 14 ,padding:10}}>
//               Terms & Conditions
//             </Text>
//           </View>
//           <View style={{ marginEnd: 30 }}>
//             <Btn
//               textColor="white"
//               bgColor={darkGreen}
//               btnLabel="Signup"
//               Press={() => {
//                 alert('Account created');
//                 router.replace('/login'); // Replace instead of push
//               }}
              
//             />
//           </View>
//           <View style={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             // paddingRight: 50,
//             marginLeft: 10
//           }}>
//             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
//               Already have an account?
//             </Text>
//             <TouchableOpacity onPress={() => router.push('/login')}>
//               <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
//                 Login
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import Background from '../../components/Background';
// import Btn from '../../components/Btn';
// import { darkGreen } from '../../components/Colors';
// import Field from '../../components/Fields';
// import { useRouter } from "expo-router"; 
// import { db } from '../../components/firebase';  
// import { addDoc, collection } from "firebase/firestore";

// const Signup = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const router = useRouter();

//   const handleSignup = async () => {
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const docRef = await addDoc(collection(db, "users"), {
//         fullname: fullName,
//         email: email,
//         contact: contact,
//         password: password,
//         confirmPassword:confirmPassword,
//       });
//       console.log("Document written with ID: ", docRef.id);
//       alert('Account created');
//       router.replace('/login');
//     } catch (e) {
//       console.error("Error adding document: ", e);
//       alert("Error creating account");
//     }
//   };

//   return (
//     <Background>
//       <View style={{ alignItems: 'center', width: 390 }}>
//         <Text style={{ color: 'white', fontSize: 54, fontWeight: 'bold', marginTop: 55 }}>
//           Register
//         </Text>
//         <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
//           Create a new account
//         </Text>
//         <View style={{
//           backgroundColor: 'white',
//           height: 700,
//           width: 460,
//           borderTopLeftRadius: 150,
//           paddingTop: 20,
//           alignItems: 'center',
//         }}>
//           <Field placeholder="Full Name" value={fullName} onChangeText={setFullName} />
//           <Field placeholder="Email / Username" value={email} onChangeText={setEmail} keyboardType="email-address" />
//           <Field placeholder="Contact Number" value={contact} onChangeText={setContact} keyboardType="number-pad" />
//           <Field placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
//           <Field placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

//           <View style={{ display: 'flex', flexDirection: 'row', width: '80%', paddingRight: 16 }}>
//             <Text style={{ color: 'grey', fontSize: 14, padding: 10 }}>
//               By signing in, you agree to our{' '}
//             </Text>
//             <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 14, padding: 10 }}>
//               Terms & Conditions
//             </Text>
//           </View>
//           <View style={{ marginEnd: 30 }}>
//             <Btn
//               textColor="white"
//               bgColor={darkGreen}
//               btnLabel="Signup"
//               Press={handleSignup}
//             />
//           </View>
//           <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 10 }}>
//             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account?</Text>
//             <TouchableOpacity onPress={() => router.push('/login')}>
//               <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}> Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Colors';
import Field from '../../components/Fields';
import { useRouter } from "expo-router"; 
import { db } from '../../components/firebase';  
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Check if the email already exists in Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a document with the same email is found, show an alert
        alert("User already exists. You can sign in.");
        return;
      }

      // If no matching email is found, proceed with signup
      const docRef = await addDoc(collection(db, "users"), {
        fullname: fullName,
        email: email,
        contact: contact,
        password: password,
        confirmPassword: confirmPassword,
      });

      console.log("Document written with ID: ", docRef.id);
      alert('Account created');
      router.replace('/login');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error creating account");
    }
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 390 }}>
        <Text style={{ color: 'white', fontSize: 54, fontWeight: 'bold', marginTop: 55 }}>
          Register
        </Text>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
          Create a new account
        </Text>
        <View style={{
          backgroundColor: 'white',
          height: 700,
          width: 460,
          borderTopLeftRadius: 150,
          paddingTop: 20,
          alignItems: 'center',
        }}>
          <Field placeholder="Full Name" value={fullName} onChangeText={setFullName} />
          <Field placeholder="Email / Username" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field placeholder="Contact Number" value={contact} onChangeText={setContact} keyboardType="number-pad" />
          <Field placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Field placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', paddingRight: 16 }}>
            <Text style={{ color: 'grey', fontSize: 14, padding: 10 }}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 14, padding: 10 }}>
              Terms & Conditions
            </Text>
          </View>
          <View style={{ marginEnd: 30 }}>
            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Signup"
              Press={handleSignup}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
