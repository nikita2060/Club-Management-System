import mongoose ,{Schema} from 'mongoose';

const clubSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },  
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: [{                                 //"members": [
                                                    //{ "name": "Alice", "role": "President" },
                                                    //{ "name": "Bob", "role": "Vice President" }
        name: {type:String,required:true}, //members:[{name:string,role:string}] pani rakhna milxa edi euta matrai parameter chaiyepar
        role: {type:String,required:true},
        
    }],
    previousEvents: [{ name: String, date: String, description: String }], // Past events
    upcomingEvents: [{ name: String, date: String, description: String }], // Future events

});

const Club = mongoose.model('Club', clubSchema);

export default Club;