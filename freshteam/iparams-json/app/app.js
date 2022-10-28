const getIparams = () => {
	return client.iparams.get()
}

const renderApp = async () => {
	try {
		const iparams = await getIparams()

		let htmlContent = `<h5>Iparams Values</h5>`

		for (const [key, value] of Object.entries(iparams)) {
			if (typeof value !== "object") {
				htmlContent += `
                <div class="mx-1"><span class="label text-uppercase">${key}</span>
                : <span class="label">${value}</span><div>`
			}
		}

		$("#app").html(htmlContent)
	} catch (error) {
		console.log("Error", error)
		$("#app").html(`Unable to retrieve Iparams Value`)
	}
}
$(document).ready(function () {
	app.initialized().then(function (_client) {
		window.client = _client
		client.events.on("app.activated", renderApp)
	})
})
