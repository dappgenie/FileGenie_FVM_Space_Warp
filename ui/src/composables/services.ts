import axios from 'axios'
import { Web3Service } from '~/services/web3'

const SERVICES = {
  web3: Web3Service
}
type ServiceMap = typeof SERVICES

export function useService<TName extends keyof ServiceMap>(name: TName): InstanceType<ServiceMap[TName]> {
  const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
    }
  })

  // create the service
  const Service = SERVICES[name]
  return new Service(agent) as InstanceType<ServiceMap[TName]>
}
