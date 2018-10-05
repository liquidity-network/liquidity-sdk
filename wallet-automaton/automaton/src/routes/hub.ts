import {Hub} from "../controllers/hub";

export function route(app) {
    app.route('/hub/wallets')
        .get(async (request, response) => {
            response.send(
                await Hub.urls.admission()
            )
        })

    app.route('/hub/audit/:address/registration')
        .get(async (request, response) => {
            try {
                console.log(await Hub.urls.audit(request.params.address))
                response.send((await Hub.urls.audit(request.params.address)).registration)
            } catch (err) {
                response.send({})
            }
        })

    app.route('/hub/audit/:address/transfers')
        .get(async (request, response) => {
            try {
                response.send((await Hub.urls.audit(request.params.address)).transfers)
            } catch (err) {
                response.send({})
            }
        })

    app.route('/hub/audit/:address/deposits')
        .get(async (request, response) => {
            try {
                response.send((await Hub.urls.audit(request.params.address)).deposits)
            } catch (err) {
                response.send({})
            }
        })
}