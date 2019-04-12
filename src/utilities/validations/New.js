import validator from "is_js";

export default function(data) {
	const errors = {};
	if (validator.empty(data.routine)) {
		errors.routine = true;
	}
	if (validator.empty(data.title)) {
		errors.title = true;
	}
	if (validator.empty(data.clue)) {
		errors.clue = true;
	}
	if (validator.empty(data.reward)) {
		errors.reward = true;
	}
	return {
		isValid: validator.empty(errors),
		errors
	};
}
