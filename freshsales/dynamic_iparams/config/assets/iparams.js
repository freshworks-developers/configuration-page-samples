/* global app,client, utils */
var timeout
/**
 * App lifecycle method to initialize the app and to obtain the `client` object
 * More details on Dynamic Installation parameters can be found at the link below ⬇️
 * https://developers.freshsales.io/docs/installation-parameters/#
 */
app.initialized().then(
	function (_client) {
		window.client = _client
	},
	function (error) {
		//If unsuccessful
		console.error(error)
	}
)

/**
 * Using this iparam callback function, we are validating the details using a third-party API
 *
 * @param {string} newValue The new value of the iparam field
 */
function checkUserName(newValue) {
	// Input type validation
	if (!isNaN(newValue)) {
		return Promise.reject("Username has to be a string")
	}
	// Validation will be performed based on the value
	// A promise will be returned indicating the status of validation
	return validateWithAPI(newValue)
}

/**
 * In this case, for example, we are making use of `api.github.com/user` to validate.
 * In real-world, this could be a valid third-party API that can return an appropriate status code indicating the status of validation
 * Payload and other options can be specified using `options`
 * Notice the presence of the debounce logic to avoid rate-limiting issues
 *
 * @param {string} value
 */
function validateWithAPI(value) {
	const url = `https://api.github.com/users/${value}`
	const options = {
		headers: {
			"user-agent": "Freshworks"
		}
	}
	return new Promise(function (resolve, reject) {
		// Do not hit the validation API immediately upon change
		// Wait for 500ms and if the user hasn't typed anything during that time, make a call
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			client.request.get(url, options).then(
				function (data) {
					// Upon success, assign name, bio & resolve
					const response = JSON.parse(data.response)
					const { name, bio } = response
					utils.set("name", { value: name })
					utils.set("bio", { value: bio })
					resolve()
				},
				function (error) {
					// Upon failure - send an appropriate validation error message
					reject("This Username does not exist. Please enter the right one")
				}
			)
		}, 500)
	})
}
