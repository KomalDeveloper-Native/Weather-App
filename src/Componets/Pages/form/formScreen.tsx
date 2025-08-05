import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { Formik } from 'formik';
import DropdownField from '../../Molecules/InputField';
import { validationSchema } from '../../../utils/Validation';
import { colors } from '../../../styles/colors';
import ArrowBack from '../../Molecules/ArrowBack';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import fonts from '../../../styles/fonts';

const formOptions = {
  region: ['East', 'West', 'North', 'South'],
  country: ['India', 'USA', 'UK', 'Canada'],
  city: ['Delhi', 'Mumbai', 'London', 'New York'],
  customerGroup: ['Retail', 'Wholesale'],
  storeCode: ['SC001', 'SC002'],
  storeName: ['Alpha Store', 'Beta Store'],
  storeType: ['Franchise', 'Company Owned'],
};

const initialValues = {
  region: '',
  country: '',
  city: '',
  customerGroup: '',
  storeCode: '',
  storeName: '',
  storeType: '',
};

const FormScreen = ({ navigation }: any) => {
  const fadeAnimations = useRef(
    Object.keys(initialValues).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = fadeAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 150, // Stagger each field
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  const handleSubmit = (values: any) => {
    console.log('Form Submitted:', values);
  };

  const fields = [
    { label: 'Region', name: 'region', data: formOptions.region },
    { label: 'Country', name: 'country', data: formOptions.country },
    { label: 'City', name: 'city', data: formOptions.city },
    { label: 'Customer Group', name: 'customerGroup', data: formOptions.customerGroup },
    { label: 'Store Code', name: 'storeCode', data: formOptions.storeCode },
    { label: 'Store Name', name: 'storeName', data: formOptions.storeName },
    { label: 'Store Type', name: 'storeType', data: formOptions.storeType },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ArrowBack navigation={navigation} />
      <View style={styles.card}>
        <Text style={styles.heading}>Store Registration Form</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {formik => (
            <>
              {fields.map((field, index) => (
                <Animated.View
                  key={field.name}
                  style={{
                    opacity: fadeAnimations[index],
                    transform: [
                      {
                        translateY: fadeAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                    ],
                  }}>
                  <DropdownField
                    label={field.label}
                    name={field.name}
                    formik={formik}
                    data={field.data}
                    icon={true}
                  />
                </Animated.View>
              ))}

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={formik.handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.InterBold,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: colors.white,
    fontFamily: fonts.InterBold,
    fontSize: responsiveFontSize(2),
  },
});

export default FormScreen;
