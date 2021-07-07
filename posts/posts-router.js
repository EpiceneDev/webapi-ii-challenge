const router = require('express').Router();

// 5 update path for the require
const Posts = require('../data/db.js');

// 3
// this router handles requests beginning with /api/posts
// so we remove that part of the URI and replace it with a /

// 4 rename server. to router.

// POST	/api/posts	Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
    const post = req.body;
    Posts.insert(post)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error adding the post',
            });
    });
});

//POST	/api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
    const comment = { text: req.body.text, post_id: req.params.id };
    db.findById(req.params.id)
        .then(post => {
          if (post) {
            if (comment.text && comment.post_id) {
              Posts.insertComment(comment)
                .then(comment => {
                  res.status(201).json(comment)
                })
              } else {
                res.status(400).json({ errorMessage: "Please provide text for the comment."})
              }   
            } else {
              res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'There was an error while saving the comment to the database' })
        })
});

// GET	/api/posts	Returns an array of all the post objects contained in the database.
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

// GET	/api/posts/:id	Returns the post object with the specified id.
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


// DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
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

// PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Posts.update(id, changes)
    .then(post => {
      if (post) {
        res.status(201).json(changes);
      } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      }).end();
    });
});


// GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    Posts.findCommentById(postId)
        .then(comments => { 
            if (comments.length) {
                res.status(201).json(comments);
            } else {
                res.status(404).json({ errorMessage: "Please provide text for the comment." });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
});


router.get('/:id/users', (req, res) => {

});

router.get('/:id/threads', (req, res) => {});

// add an endpoint that returns all the messages for a post
// add an endpoint for adding new message to a post

// export default router; // ES Modules

module.exports = router;