import passport from "passport";
import { Staff, Admin } from "../models/index.js";
import { JWT_SECRET_KEY } from "../config/config.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const model = payload.type === "admin" ? Admin : Staff;
      const user = await model.findByPk(payload.userId);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

const auth = () => passport.authenticate("jwt", { session: false });

export default auth;
