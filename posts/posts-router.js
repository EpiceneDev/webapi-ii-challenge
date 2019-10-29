const router = require('express').Router();

// 5 update path for the require
const Posts = require('../data/db.js');

// 3
// this router handles requests beginning with /api/posts
// so we remove that part of the URI and replace it with a /

// 4 rename server. to router.
router.get('/', (req, res) => {
  // google.com?term=express&sort=desc&field=date

  const query = req.query;

  Posts.find(query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.post('/', (req, res) => {
  Posts.add(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
});

module.exports = router;


router.get('/:id/messages', (req, res) => {});

router.post('/:id/messages', (req, res) => {
  const message = { ...req.body, postId: req.params.id };

  // save the message
});

router.get('/:id/users', (req, res) => {});

router.get('/:id/threads', (req, res) => {});

// add an endpoint that returns all the messages for a post
// add an endpoint for adding new message to a post

// export default router; // ES Modules
