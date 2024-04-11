const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Post Controller', () => {
    describe('POST /posts', () => {
        it('should create a new post', (done) => {
            chai.request(app)
                .post('/posts')
                .send({
                    title: 'Test Post',
                    content: 'This is a test post',
                    imageUrl: 'https://example.com/image.jpg',
                    categoryId: 1
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').that.equals('Post created successfully');
                    done();
                });
        });
    });

   er
});
