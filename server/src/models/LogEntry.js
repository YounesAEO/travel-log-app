const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqString = {
	type: String,
	required: true,
};
const reqNum = {
	type: Number,
	required: true,
};

const logEntrySchema = new Schema(
	{
		title: reqString, // String is shorthand for {type: String}
		description: String,
		rating: { type: Number, min: 1, max: 5, default: 1 },
		comments: String,
		latitude: { ...reqNum, min: -90, max: 90 },
		longitude: { ...reqNum, min: -180, max: 180 },
		image: String,
		visitDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
