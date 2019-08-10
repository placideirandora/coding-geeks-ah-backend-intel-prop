import { getMaxListeners } from "cluster";
import { genToken } from "../../helpers/auth";

export default {
  invalidFirstName: {
    firstName: 'Jamal*',
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  firstNumFirstName: {
    firstName: '1Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  missingFirstName: {
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  lessFirstName: {
    firstName: 'J',
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  numFirstName: {
    firstName: 1,
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  invalidLastName: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa*',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  firstNumLastName: {
    firstName: 'Jamal',
    lastName: '2Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal.123',
    confirmPassword: 'Jamal.123'
  },
  missingLastName: {
    firstName: 'Jamal',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  lessLastName: {
    firstName: 'Jamal',
    lastName: 'K',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  numLastName: {
    firstName: 'jamal',
    lastName: 2,
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  invalidUserName: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kad*',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  firstNumUserName: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: '3Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  missingUserName: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  lessUserName: {
    firstName: 'Jamal',
    lastName: 'Kadhua',
    userName: 'K',
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  numUserName: {
    firstName: 'jamal',
    lastName: 'Kadhua',
    userName: 3,
    email: 'jamal@gmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  invalidEmail: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhu',
    email: 'jamalgmail.com',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  missingEmail: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhu',
    password: 'Jamal123',
    confirmPassword: 'Jamal123'
  },
  invalidPassword: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhu',
    email: 'jamal@gmail.com',
    password: 'Jamal',
    confirmPassword: 'Jamal123'
  },
  missingPassword: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhu',
    email: 'jamal@gmail.com'
  },
  unmatchedPassword: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhu',
    email: 'jamal@gmail.com',
    password: 'Jama.l123',
    confirmPassword: 'Jamal12'
  },
  validUser: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhut',
    email: 'hareraloston@gmail.com',
    password: 'Jamal.123',
    confirmPassword: 'Jamal.123'
  },
  existingEmail: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhut',
    email: 'hareraloston@gmail.com',
    password: 'Jamal.123',
    confirmPassword: 'Jamal.123'
  },
  existingUserName: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kadhut',
    email: 'kad@gmail.com',
    password: 'Jamal.123',
    confirmPassword: 'Jamal.123'
  },
  missingConfirm: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal.123'
  },
  numConfirmPassword: {
    firstName: 'Jamal',
    lastName: 'Kadhuwa',
    userName: 'Kaduzi',
    email: 'jamal@gmail.com',
    password: 'Jamal.123',
    confirmPassword: 1
  },
  emailForSend: {
    email: 'hareraloston@gmail.com',
  },
  unexestingEmailForSend: {
    email: 'hareraloston1@gmail.com',
  },
  invalidEmailForSend: {
    email: 'hareraloston1@gmail',
  },
  resetPassword: {
    password: 'Jamal.123',
    confirmPassword: 'Jamal.123'
  },
  invalidResetPassword: {
    password: 'jamal.123',
    confirmPassword: 'Jamal.123'
  },
  resetMissingPassword: {},
  resetPasswordUnmatch: {
    password: 'Jamal.123',
    confirmPassword: 'Jamal123'
  },
  resetMissingConfirmPassword: {
    password: 'Jamal.123'
  },
  numresetConfirmPassword: {
    password: 'Jamal.123',
    confirmPassword: 1
  },
};
