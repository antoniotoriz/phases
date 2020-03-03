const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post.model');
// const email_REGEX = (?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]);

const userSchema = new Schema({
    info: {
        firstName: { 
            type: String,
            required: [true, "First name is required"],
            minlength:  [2, "First name must be  at least 2 characters long"]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [2, "Last name must be at lease 2 characters long"]
        },
        username: String, // required
        height: Number,
        weight: Number,
        dob: Date,
        password: String // required
    },
    contact: {
        email: { 
            type: String,
            required: true,
            // validate: {
            //     validator: function (v) {
            //         return email_REGEX.test(v);
            //     },
            //     message: props => `${props.value} is not a valid email!`
            // } 
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        }
    },
    subscription: {
        userPoints: Number,
        userLevel: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
            required: true
        },
        subscriptionLevel: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
            required: true
        },
        timesVisited: {
            type: Number,
            default: 0
        },
        dayStreak: { 
            type: Number,
            default: 0
        }
    },
    location: {
        city: { type: String },
        state: { type: String },
        zipCode: any,
        country: { type: String }
    },
    activity: {
        likes: {
            type: Number,
            default: 0
        },
        reviews: [ReviewSchema],
        posts: [PostSchema],
        comments: [CommentSchema]
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
