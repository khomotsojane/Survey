import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { collection, getDocs, addDoc } from '@firebase/firestore';
import { db } from './Firebase';
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Form = (props) => {
  const navigation = props.navigation;
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [favoriteFood, setFavoriteFood] = useState([]);
  const [watchMoviesRating, setWatchMoviesRating] = useState(0);
  const [listenRadioRating, setListenRadioRating] = useState(0);
  const [eatOutRating, setEatOutRating] = useState(0);
  const [watchTVRating, setWatchTVRating] = useState(0);

  const onChange = (e, selectedDate) => {
    setDateOfBirth(selectedDate);
  };

  const foodOptions = [
    { label: 'Pizza', value: 'pizza' },
    { label: 'Pasta', value: 'pasta' },
    { label: 'Pap and Wors', value: 'papAndWors' },
    { label: 'Other', value: 'other' },
  ];

  const handleCheckboxChange = (value) => {
    if (favoriteFood.includes(value)) {
      setFavoriteFood(favoriteFood.filter((item) => item !== value));
    } else {
      setFavoriteFood([...favoriteFood, value]);
    }
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "formdata"), {
        fullName,
        dateOfBirth,
        email,
        contactNumber,
        favoriteFood,
        watchMoviesRating,
        listenRadioRating,
        eatOutRating,
        watchTVRating,
      });
      alert("Added successfully");
      navigation.navigate('ViewSurveyResults');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Date of Birth</Text>
      <DateTimePicker
        value={dateOfBirth}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholder="Enter your contact number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Favorite Food</Text>
      {foodOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <Checkbox
            checked={favoriteFood.includes(option.value)}
            onValueChange={() => handleCheckboxChange(option.value)}
          />
          <Text>{option.label}</Text>
        </View>
      ))}

      <Text style={styles.label}>Ratings</Text>
      <View style={styles.ratingWrap}>
        <Text style={styles.heading}>I like to watch movies</Text>
        <Rating
          type='star'
          ratingCount={5}
          imageSize={30}
          onFinishRating={setWatchMoviesRating}
          startingValue={watchMoviesRating}
        />
        <Text style={styles.ratingValue}>{watchMoviesRating.toFixed(1)} out of 5</Text>
      </View>
      <View style={styles.ratingWrap}>
        <Text style={styles.heading}>I like to listen to radio</Text>
        <Rating
          type='star'
          ratingCount={5}
          imageSize={30}
          onFinishRating={setListenRadioRating}
          startingValue={listenRadioRating}
        />
        <Text style={styles.ratingValue}>{listenRadioRating.toFixed(1)} out of 5</Text>
      </View>
      <View style={styles.ratingWrap}>
        <Text style={styles.heading}>I like to eat out</Text>
        <Rating
          type='star'
          ratingCount={5}
          imageSize={30}
          onFinishRating={setEatOutRating}
          startingValue={eatOutRating}
        />
        <Text style={styles.ratingValue}>{eatOutRating.toFixed(1)} out of 5</Text>
      </View>
      <View style={styles.ratingWrap}>
        <Text style={styles.heading}>I like to watch TV</Text>
        <Rating
          type='star'
          ratingCount={5}
          imageSize={30}
          onFinishRating={setWatchTVRating}
          startingValue={watchTVRating}
        />
        <Text style={styles.ratingValue}>{watchTVRating.toFixed(1)} out of 5</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  ratingWrap: {
    maxWidth: 480,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  ratingValue: {
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(46,204,113,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(46,204,113,0.5)',
    borderRadius: 5,
  },
});

export default Form;
