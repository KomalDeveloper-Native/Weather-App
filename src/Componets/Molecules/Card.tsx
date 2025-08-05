/* eslint-disable dot-notation */
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {colors} from '../../styles/colors';
import {Card} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Typography from '../Atoms/Typography';
import fonts from '../../styles/fonts';
type Props = {
  slide?: any;
  style?:object
  onPress?:()=>void
};

const CardCategory = ({slide,style,onPress}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.wrapper}>
        {slide.map((item: any, index: number) => (
          <Card key={index} style={[styles.slide,style]} onPress={onPress}>
            <Image source={item.image} style={[styles.image,style]} />
            {item.title && (
              <View style={[styles.titleItem,style]}>
                <Typography
                  title={item.title}
                  textColor={colors.darkText}
                  style={[styles.title,style]}
                />
                <Typography
                  title={item.description}
                  textColor={colors.darkText}
                  style={styles.description}
                />
                {item.price && (
                  <View style={styles.row}>
                  <Typography
                    title={`Price: ₹${item.price}`}
                    textColor={colors.darkText}
                    style={[styles.meta,style]}
                  />
                  <Typography
                    title={`Rating: ⭐ ${item.rating}`}
                    textColor={colors.darkText}
                    style={[styles.meta,style]}

                  />
                 
                </View>
                )}
                
              </View>
            )}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.background,
  },
  slide: {
    width: responsiveWidth(85),

    height: responsiveHeight(41),
    alignItems: 'center',

    backgroundColor: colors.background,
    padding: 10,
    marginRight: 10,
  },
  image: {
    width: responsiveWidth(80),
    height: responsiveHeight(20),
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleItem: {
    flexDirection: 'column',
    gap: 10,
    marginLeft: 15,
  },
  title: {
    width: responsiveWidth(65),
    fontFamily: fonts['InterBold'],
    fontSize: responsiveFontSize(2.2),
    color: colors.darkText,
  },
  description: {
    width: responsiveWidth(65),
    fontFamily: fonts['InterMedium'],
    fontSize: responsiveFontSize(1.8),
    color: colors.darkText,
  },
  row: {
    flexDirection: 'row',
    gap:2
  },
  meta: {
    fontFamily: fonts['InterMedium'],
    fontSize: responsiveFontSize(1.4),
  },
});

export default CardCategory;
