import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'employee'], 
    default: 'employee' 
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try {
        //Generar salt con bcrypt
        const salt = await bcrypt.genSalt(10);
        //hash la contraseña
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})


userSchema.methods.comparePassword = async function (candiatePassword) {
    return bcrypt.compare(candiatePassword, this.password)
}

const User = model('User', userSchema);
export default User;
