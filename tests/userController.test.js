const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Controller', () => {
    describe('POST /users/sign-up', () => {
        it('should create a new user', (done) => {
            chai.request(app)
                .post('/users/sign-up')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').that.equals('User created successfully');
                    done();
                });
        });
    });

    describe('POST /users/login', () => {
        it('should authenticate a user', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').that.equals('Authentication complete');
                    expect(res.body).to.have.property('token').that.is.a('string');
                    done();
                });
        });
    });
});
