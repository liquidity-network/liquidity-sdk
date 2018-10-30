import {Deposits} from "../controllers/deposits"

export function route(app) {

    app.route('/deposits')
        .post(async (request, response) => {
            response.send(
                await Deposits.send(
                    request.body.amount,
                )
            )
        })
}
