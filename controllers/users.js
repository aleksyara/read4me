const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile,
  addStoryToPlaylist,
  getPlaylist,
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  console.log(req.body)
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user', !user, !!user)
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  try {
    const user = await User.findOne({username: req.params.username});
    console.log("*******user", user);
    // const posts = await Post.find({user: user._id});
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    return res.status(401).json(err)
  }
}

async function addStoryToPlaylist(req, res){
 try {
    const user = await User.findOne({_id: req.params.id});
    // console.log("********88", req.body);
    user.playlist.push(req.body);
    // console.log("user------>", user);
    const playlistSaveResult = await user.save();
    // console.log("playlistSaveResult:", playlistSaveResult);
    res.send(playlistSaveResult);
  } catch(err){
    res.status(500).send(err);
  }
}

async function getPlaylist(req, res){
  try {
     const user = await User.findOne({_id: req.params.id});
     res.send(user.playlist);
   } catch(err){
     res.status(500).send(err);
   }
 }

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
