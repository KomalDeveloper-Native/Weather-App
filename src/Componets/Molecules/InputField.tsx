import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fonts from '../../styles/fonts';

const DropdownField = ({ label, name, formik, data = [], icon = true }: any) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    formik.setFieldValue(name, item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={`Select or type ${label}`}
          placeholderTextColor={colors.darkText}
          value={formik.values[name]}
          onChangeText={(text) => formik.setFieldValue(name, text)}
          returnKeyType="next"
        />

        {icon!=false && (
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon name="arrow-drop-down" size={28} color={colors.lightText} />
          </TouchableOpacity>
        )}
      </View>

      {formik.touched[name] && formik.errors[name] && (
        <Text style={styles.error}>{label} is {formik.errors[name]}</Text>
      )}

      {/* Dropdown Modal */}
      {icon!=false && (
        <Modal visible={visible} transparent animationType="fade">
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setVisible(false)}
            style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={data}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item)}>
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontFamily: fonts.InterMedium,
    color: colors.darkText,
    marginBottom: 6,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 42,
    fontFamily: fonts.InterMedium,
    color: colors.darkText,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    maxHeight: 300,
  },
  item: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
  },
  itemText: {
    fontFamily: fonts.InterMedium,
    color: colors.darkText,
  },
});

export default DropdownField;
