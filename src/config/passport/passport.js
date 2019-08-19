import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { unhashedPassword } from '../../helpers/auth';
import { User } from '../../sequelize/models';
import randomNumber from '../../helpers/generator';

passport.serializeUser((user, done) => {
  done(null, user);
});

const passportConfig = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      /**
       * @param {object} req
       * @param {object} email
       * @param {object} password
       * @param {object} done
      * @returns {object} logged in user information or error.
      */
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
          if (!user.verified) {
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

  passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/v1/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'displayName']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const currentUser = await User.findOne({ where: { socialid: profile.id } });
      if (currentUser) {
        return done(null, currentUser);
      }
      const userEmail = await User.findOne({ where: { email: profile.emails[0].value } });
      if (userEmail) {
        const username = await User.findOne({ where: { email: profile.emails[0].value }, attributes: ['userName'], raw: true });
        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          userName: Object.values(username)[0],
          email: profile.emails[0].value,
          socialid: profile.id,
          platform: 'facebook',
          verified: true
        });
        if (newUser) {
          return done(null, newUser);
        }
      } else {
        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          userName: profile.name.givenName + randomNumber(),
          email: profile.emails[0].value,
          socialid: profile.id,
          platform: 'facebook',
          verified: true
        });
        if (newUser) {
          return done(null, newUser);
        }
      }
    } catch (err) {
      done(err, false, err.message);
    }
  }));

  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: '/api/v1/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const currentUser = await User.findOne({ where: { socialid: profile.id } });
      if (currentUser) {
        return done(null, currentUser);
      }
      const userEmail = await User.findOne({ where: { email: profile.emails[0].value } });
      if (userEmail) {
        const username = await User.findOne({ where: { email: profile.emails[0].value }, attributes: ['userName'], raw: true });
        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          userName: Object.values(username)[0],
          email: profile.emails[0].value,
          socialid: profile.id,
          platform: 'google',
          verified: true
        });
        if (newUser) {
          return done(null, newUser);
        }
      } else {
        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          userName: profile.name.givenName + randomNumber(),
          email: profile.emails[0].value,
          socialid: profile.id,
          platform: 'google',
          verified: true
        });
        if (newUser) {
          return done(null, newUser);
        }
      }
    } catch (err) {
      done(err, false, err.message);
    }
  }));

  passport.use('twitter', new TwitterStrategy({
    consumerKey: process.env.TWITTER_APP_KEY,
    consumerSecret: process.env.TWITTER_APP_SECRET,
    callbackURL: '/api/v1/auth/twitter/callback',
    userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    includeEmail: true
  },
  async (token, tokenSecret, profile, done) => {
    try {
      const fullName = profile.displayName;
      const fullNameArr = fullName.split(' ');
      const currentUser = await User.findOne({ where: { socialid: profile.id } });
      if (currentUser) {
        return done(null, currentUser);
      }
      const userEmail = await User.findOne({ where: { email: profile.emails[0].value } });
      if (userEmail) {
        const username = await User.findOne({ where: { email: profile.emails[0].value }, attributes: ['userName'], raw: true });
        const newUser = await User.create({
          firstName: fullNameArr[0],
          lastName: fullNameArr[1],
          userName: Object.values(username)[0],
          email: profile.emails[0].value,
          socialid: profile.id,
          platform: 'twitter',
          verified: true
        });
        if (newUser) {
          return done(null, newUser);
        }
      } else {
        const newUser = await User.create({
          firstName: fullNameArr[0],
          lastName: fullNameArr[1],
          userName: fullNameArr[0] + randomNumber(),
          email: profile.emails[0].value,
          socialid: profile.id,
          platform: 'twitter',
          verified: true
        });
        if (newUser) {
          return done(null, newUser);
        }
      }
    } catch (err) {
      done(err, false, err.message);
    }
  }));
};

export default passportConfig;
