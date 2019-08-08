import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { unhashedPassword } from '../../helpers/auth';
import { User } from '../../sequelize/models';

const passportConfig = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          ({ email, password } = req.body);
          const user = await User.findOne({
            where: {
              email
            }
          });
          if (!user || !unhashedPassword(password, user.password)) {
            return done({ message: 'Incorrect email or password' });
          }
          if (user.status !== 'active') {
            return done({
              message:
                'Please verify your account first. Visit your email to verify'
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default passportConfig;
