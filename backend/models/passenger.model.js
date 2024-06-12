import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        type: [{ name: String, token: String }],
        required: true
    },
})

passengerSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id, email: this.email, password: this.password }, process.env.JWT_SECRET)

    const index = this.tokens.findIndex((token) => token.name === 'auth_token')
    if (index === -1) this.tokens.concat({ name: 'auth_token', token })

    return token
}

const Passenger = mongoose.model('Passenger', passengerSchema)
export default Passenger

