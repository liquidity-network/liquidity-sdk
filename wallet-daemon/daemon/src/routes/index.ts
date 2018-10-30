const routes = [
    'hub',
    'invoices',
    'transfers',
    'wallet',
    'deposits'
]

export default app => {
    routes.map(async route => {
        const routeModule = await import(`./${route}`)
        routeModule.route(app)
    })
}
