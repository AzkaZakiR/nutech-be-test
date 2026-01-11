import { UserRepository } from "../repository/user.repository";
import { error } from "../utils/errorHandle/error";

const userRepository = new UserRepository();

export async function getUserById(userId: string) {
   const user = await userRepository.findById(userId);
   if (!user) {
      error(404, 104, "User tidak ditemukan");
   }
   return user;
}
export async function updateUserBalance(userId: string, amount: bigint) {
   const user = await userRepository.findById(userId);
   if (!user) {
      error(404, 104, "User tidak ditemukan");
   }

   const newBalance = BigInt(user.balance) + amount;
   if (newBalance < 0) {
      error(400, 105, "Saldo tidak mencukupi");
   }

   const updatedUser = await userRepository.updateBalance(userId, newBalance);
   return updatedUser;
}

export async function updateProfile(userId: string, payload: any) {
   const user = await userRepository.findById(userId);
   if (!user) {
      error(404, 104, "User tidak ditemukan");
   }
   const updatedUser = await userRepository.updateUser(userId, payload);
   return updatedUser;
}

export async function updateProfilePhoto(userId: string, photoUrl: string) {
   const user = await userRepository.findById(userId);
   if (!user) {
      error(404, 104, "User tidak ditemukan");
   }
   const updatedUser = await userRepository.updateUserPhoto(userId, photoUrl);
   return updatedUser;
}
