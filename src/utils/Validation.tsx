import * as Yup from 'yup';

export const Login = Yup.object().shape({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('password is required'),
});

export const validationSchema = Yup.object().shape({
  region: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  customerGroup: Yup.string().required('Required'),
  storeCode: Yup.string().required('Required'),
  storeName: Yup.string().required('Required'),
  storeType: Yup.string().required('Required'),
});
