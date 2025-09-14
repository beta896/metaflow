// passportSetup.js — Google OAuth + JWT Strategy

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '../config/env.js';

// ?? Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL: env.GOOGLE_REDIRECT_URI
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // TODO: Replace with DB lookup or creation logic
    const user = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || null,
      avatar: profile.photos?.[0]?.value || null
    };
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// ?? Session Serialization
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  // TODO: Replace with DB lookup by ID
  done(null, { googleId: id });
});

export default passport;
