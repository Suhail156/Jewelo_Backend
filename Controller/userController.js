import userjoi from "../Validation/userValidation.js";
import User from "../Models/userSchema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    try {
      const { error } = userjoi.validate(req.body);
      if (error) return res.status(400).json({ msg: error.details[0].message });
  
      const { name, email, number, password } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, number, password: hashed });
      await user.save();
      res.status(201).json({ message: 'User registered',data:user });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', err });
    }
  };


//user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const uservalid = await User.findOne({ email })

        if (!uservalid) {
            return res.status(404).json({ error: "user not found" })
        }

        const validpass = bcrypt.compareSync(password, uservalid.password)
        if (!validpass) {
            return res.status(401).json({ error: "Wrong credential" })
        }
        const token = Jwt.sign({ id: uservalid._id }, process.env.USER_SECRET_TOKEN);
        const { password: hashedPassword, ...rest } = uservalid._doc;
        return res.status(200).json({ message: 'successfully logged in', data: { ...rest, token } })
    } catch (error) {
        console.log(error);

    }

}