import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res ,next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400,'All fields are required'))
  }
  const hashedPassword = bcryptjs.hashSync(password,10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    next(error)
  }
};
export const signin = async (req,res,next) => {
  const { email , password } = req.body;


  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    

    {/*const { password: pass, ...rest } = validUser._doc;*/}
    const { password: _, ...rest } = validUser.toObject(); 

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .json(rest);
  } catch (error) {
    next(error);
  }

}
  

export const google = async (req,res,next) => {
  const {email,name, googlePhotoUrl} = req.body;
  try {
    const user = await User.findOne({email}) ;
    if(user){
      const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET
      )
      
      const {password,...rest} = user._doc;

      res.status(200).cookie('access_token',token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
      }).
      json(rest);
      
    }else{
      const generatedPassword = 
      Math.random().toString(36).slice(-8) + 
      Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
      const newUser = new User({
        username: 
        name.toLowerCase().split(' ').join('') +
         Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      })
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id},
        process.env.JWT_SECRET)

      const {password,...rest} = newUser._doc;

      res
      .status(200)
      .cookie('access_token',token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      }).json(rest);
    }
  } catch (error) {
    next(error)
  }
}
 





/*export const google = async (req, res, next) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const user = new User({
        //username: name.toLowerCase().replace(/\s+/g, "") + Math.random().toString(9).slice(-4),
        username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
      expires: new Date(Date.now() + 3600000),
    } );{ /*expiresIn: "1h"*//* }

    const { password: _, ...rest } = user.toObject();

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        //secure: false, //  Set to false for local dev (true for production)
        //sameSite: "Lax",
        //expires: new Date(Date.now() + 3600000),
      })
      .json(rest);

        
  } catch (error) {
    next(error);
  }
};*/








/*import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res ,next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400,'All fields are required'))
  }
  const hashedPassword = bcryptjs.hashSync(password,10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    next(error)
  }
};

export const signin = async (req,res,next) => {
    const { email , password } = req.body;

    if(!email || !password || email === '' || password === ''){
      next(errorHandler(400, 'All fields are required'));
    }
    try{
      const validUser = await User.findOne({ email });
      if(!validUser){
        return  next(errorHandler(400,'user not found'))
      }
      const validPassword = bcryptjs.compareSync(password,validUser.password)
      if(!validPassword){
        return next(errorHandler(400,'Invalid password'))
      }

      const token = jwt.sign(
        { id: validUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' } 
      );

     {/* const {password: pass, ...rest} = validUser._doc; } 
      const { password: _, ...rest } = validUser.toObject(); 

      res.status(200).cookie('access_token',token, {
        httpOnly: true,          // Prevents JavaScript access
        //secure: process.env.NODE_ENV === "production" ? true : false,   Use secure cookies in production
        secure: false,
        sameSite: "Strict",      // Prevents CSRF attacks
        expires: new Date(Date.now() + 3600000)
      }).json(rest);
      
    }catch(error){
        next(error)
    }
}

export const google = async (req,res,next) => {
  const {email,name, googlePhotoUrl} = req.body;
  try {
    const user = await User.findOne({email}) ;
    if(user){
      const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
      const {password,...rest} = user._doc;

      res.status(200).cookie('access_token',token, {
        httpOnly: true,          // Prevents JavaScript access
        secure: false,
        //secure: process.env.NODE_ENV === "production" ? true : false,  // Use secure cookies in production
        sameSite: "Strict",      // Prevents CSRF attacks
        expires: new Date(Date.now() + 3600000)
      }).json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      })
      await newUser.save();
      const token = jwt.sign({ id: newUser._id},process.env.JWT_SECRET)
      const {password,...rest} = newUser._doc;

      res.status(200).cookie('access_token',token, {
        httpOnly: true,          // Prevents JavaScript access
        secure: false,
        //secure: process.env.NODE_ENV === "production" ? true : false,  // Use secure cookies in production
        sameSite: "Strict",      // Prevents CSRF attacks
        expires: new Date(Date.now() + 3600000)
      }).json(rest);
    }
  } catch (error) {
    next(error)
  }

  httpOnly: true,          // Prevents JavaScript access
        secure: false,
        //secure: process.env.NODE_ENV === "production" ? true : false,  // Use secure cookies in production
        sameSite: "Strict",      // Prevents CSRF attacks
        expires: new Date(Date.now() + 3600000)
}*/