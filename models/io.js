module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var IO = new Schema({
	    name: {
	    	type: String,
	    	required: true
	    },
	    type: {
	    	type: String,
	    	required: true
	    },
	    mode: {
	    	type: String,
	    	required: true
	    },
	    created: {
	    	type: Date,
	    	default: Date.now
	    },
	    settings:{}
	});
	return IO;
};