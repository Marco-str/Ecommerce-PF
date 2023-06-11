const protected = (req, res) => {
  try {
    res.status(200).json({ msg: "You are authorized" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = protected;
