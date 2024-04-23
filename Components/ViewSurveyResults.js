import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from './Firebase';
import { View, Text, StyleSheet } from 'react-native';

const ViewSurveyResults = () => {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const surveyCollection = collection(db, 'formdata');
      const snapshot = await getDocs(surveyCollection);
      const data = snapshot.docs.map(doc => doc.data());
      setSurveyData(data);
    };

    fetchData();
  }, []);

  const calculateStatistics = () => {
    const today = new Date();
    const ages = surveyData.map(data => {
      const dob = new Date(data.dateOfBirth);
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        return age - 1;
      }
      return age;
    });

    const averageAge = (ages.reduce((acc, cur) => acc + cur, 0) / ages.length).toFixed(1);
    const oldestAge = Math.max(...ages);
    const youngestAge = Math.min(...ages);

    const favoriteFoods = surveyData.flatMap(data => data.favoriteFood);
    const foodCounts = favoriteFoods.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    const totalPeople = surveyData.length;
    const foodPercentages = Object.entries(foodCounts).map(([food, count]) => {
      return { food, percentage: ((count / totalPeople) * 100).toFixed(1) };
    });

    const averageRatings = {
      watchMovies: calculateAverageRating('watchMoviesRating'),
      listenToRadio: calculateAverageRating('listenRadioRating'),
      eatOut: calculateAverageRating('eatOutRating'),
      watchTV: calculateAverageRating('watchTVRating')
    };

    return {
      averageAge,
      oldestAge,
      youngestAge,
      foodPercentages,
      averageRatings
    };
  };

  const calculateAverageRating = (activity) => {
    const ratings = surveyData.map(data => data[activity]);
    const averageRating = (ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length).toFixed(1);
    return averageRating;
  };

  const { averageAge, oldestAge, youngestAge, foodPercentages, averageRatings } = calculateStatistics();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey Results</Text>
      <Text style={styles.info}>Total number of surveys: {surveyData.length}</Text>
      <Text style={styles.info}>Average Age: {averageAge}</Text>
      <Text style={styles.info}>Oldest person: {oldestAge}</Text>
      <Text style={styles.info}>Youngest person: {youngestAge}</Text>

      <Text style={styles.subTitle}>Percentage of people who like each food:</Text>
      {foodPercentages.map(({ food, percentage }) => (
        <Text key={food} style={styles.info}>{food}: {percentage}%</Text>
      ))}

      <Text style={styles.subTitle}>Average ratings for activities:</Text>
      <Text style={styles.info}>People who like to watch movies: {averageRatings.watchMovies}</Text>
      <Text style={styles.info}>People who like to listen to radio: {averageRatings.listenToRadio}</Text>
      <Text style={styles.info}>People who like to eat out: {averageRatings.eatOut}</Text>
      <Text style={styles.info}>People who like to watch TV: {averageRatings.watchTV}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  info: {
    fontSize: 18,
    marginBottom: 10
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  }
});

export default ViewSurveyResults;
