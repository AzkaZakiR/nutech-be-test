import { BannerRepository } from "../repository/banner.repository";
const bannerRepository = new BannerRepository();
export async function getAllBanners() {
   const banners = await bannerRepository.getAllBanners();
   return banners;
}
