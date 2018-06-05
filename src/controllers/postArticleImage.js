module.exports = function(req, res) {

  if(!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  let articleImage = req.files.articleImage;

  articleImage.mv('./public/articles/images/' + articleImage.name, function(error) {

    if(error) {
      return res.status(500).send(error);
    }

    return res.json({ success: true });
  });
};
