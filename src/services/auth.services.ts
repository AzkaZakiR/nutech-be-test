import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt.utils";
import { AuthRepository } from "../repository";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 12;
const authRepository = new AuthRepository();
export async function register(payload: any) {
   try {
      const existingUser = await authRepository.findByEmail(payload.email);

      if (existingUser) {
         return {
            status: false,
            err: { code: 400, message: "Email already exist" },
         };
      }

      const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

      const user = await authRepository.create(payload, hashedPassword);

      return {
         status: true,
         data: {
            id: user.id,
         },
      };
   } catch (error) {
      console.log(error);
      return {
         status: false,
         err: { code: 500, message: "Internal server error" },
      };
   }
}

export async function login(payload: any) {
   try {
      const user = await authRepository.findByEmail(payload.email);

      if (!user) {
         return {
            status: false,
            err: { code: 404, message: "User doesnt exist" },
         };
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);

      if (!isMatch) {
         return {
            status: false,
            err: { code: 401, message: "Wrong email or password" },
         };
      }

      const jwtPayload = {
         id: user.id,
         email: user.email,
         fullName: `${user.first_name} ${user.last_name}`,
      };

      const token = signJWT(jwtPayload, "1h");

      delete user.password;

      return {
         status: true,
         data: {
            user,
            token,
         },
      };
   } catch (error) {
      console.log(error);
      return {
         status: false,
         err: { code: 500, message: "Internal server error" },
      };
   }
}
