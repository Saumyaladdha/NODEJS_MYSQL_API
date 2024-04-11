import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Assuming your Express app is exported from app.js

chai.use(chaiHttp);

describe('Comment Controller', () => {
    describe('POST /comments', () => {
        it('should create a new comment', (done) => {
            chai.request(app)
                .post('/comments')
                .send({
                    postId: 1,
                    userId: 1,
                    content: 'Test comment'
                })
                .end((err, res) => {
                    if (err) {
                        done(err); // Pass the error to Mocha to handle
                        return;
                    }
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').that.equals('Comment created successfully');
                    expect(res.body).to.have.property('comment').that.is.an('object');
                    done();
                });
        });
    });
});
