import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt/jwt.utils";
import { AuthRepository } from "../repository";
import { error } from "../utils/errorHandle/error";
import { registerSchema, loginSchema } from "../utils/validator/auth";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 12;
const authRepository = new AuthRepository();
export async function register(payload: any) {
   const validateArgs = registerSchema.safeParse(payload);
   if (!validateArgs.success) {
      error(400, 102, validateArgs.error?.issues[0]?.message || "Invalid request payload");
   }
   const existingUser = await authRepository.findByEmail(payload.email);

   if (existingUser) {
      error(409, 103, "Email sudah dipakai");
   }

   const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

   await authRepository.create(payload, hashedPassword);

   return null;
}

export async function login(payload: any) {
   const validateArgs = loginSchema.safeParse(payload);
   if (!validateArgs.success) {
      error(400, 102, validateArgs.error?.issues[0]?.message || "Invalid request payload");
   }
   const user = await authRepository.findByEmail(payload.email);

   if (!user) {
      error(404, 104, "user tidak ditemukan");
   }

   const isMatch = await bcrypt.compare(payload.password, user.password);

   if (!isMatch) {
      error(401, 103, "Email atau password salah");
   }

   const jwtPayload = {
      id: user.id,
      email: user.email,
      fullName: `${user.first_name} ${user.last_name}`,
   };

   const token = signJWT(jwtPayload, "12h");

   delete user.password;

   return {
      token,
   };
}
