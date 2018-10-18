import LqdClient, {signMessageHubModel} from "./lqd-client"
import request from 'request-promise-native'

export class Hub {
    public static urls = {
        admission: async () => {
            try {
                return await request(`${LqdClient.hubProvider().url}/admission`)
            } catch (err) {
                return 'Error while communicating with the hub'
            }
        },

        audit: async (address) => {
            try {
                return JSON.parse(await request(`${LqdClient.hubProvider().url}/audit/${address}/?format=json`))
            } catch (err) {
                return 'Error while communicating with the hub'
            }
        },
    }
}