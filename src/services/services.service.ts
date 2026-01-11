import { ServiceRepository } from "../repository/service.repository";

const serviceRepository = new ServiceRepository();
export async function getAllServices() {
   const services = await serviceRepository.getAllServices();
   return services;
}
