const chai = require('chai');
const chaiHttp = require('chai-http');
const apiendpoints = require('../routes/APIendpoints')

chai.use(chaiHttp);
chai.should();

const chreq = chai.request(apiendpoints);

describe("NEW USER tests=>", () => {
    it("Successful POST code", () => {
        chreq.post('/newUser').send({
            uname: "neil mehta",
            message: "hello to redis from neil mehta"
        }).end((err, res) => {
            res.should.have.status(200);
            done();
        })
    });

})


describe("GET USER tests=>", () => {
    const params_id = '01GQG4JPCN7AX67ZYR4C4YQX32'
    it("Successful GET status code", () => {
        chreq.get(`/getUser:${params_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res);
            })
        // pm.expect(pm.response.code).to.be.eql(200);
    })

    it("Successful user recovery made!!!", () => {
        chreq.get(`/getUser:${params_id}`)
            .end((err, res) => {
                res.expect(res.json().userdetails.uname).to.be.eql("magic jhonson");
            })
    })
})


describe("UPDATE USER tests=>", () => {
    const params_id = "01GQG4JPCN7AX67ZYR4C4YQX32";
    const data = {
        "uname": "neil mehta",
        "message": "message updated!! "
    }

    it("Successful UPDATE status code request", () => {
        chreq.put(`/update:${params_id}`).send(data).end((err, res) => {
            res.expect(res.code).to.be.eql(200);
        })
    })

    it("Successful entityId matching!!!", () => {
        // const eachParamArray = paramsString.split(':');
        chreq.put(`/update:${params_id}`).send(data).end((err, res)=>{
            res.expect(res.json().entityId).to.be.eql(params_id);
            res.expect(res.json().updated_data.entityId).to.be.eql(params_id);
        })
    })

    it("Successful user details updation!!", () => {
        // const raw_data = pm.request.body.raw;
        // const json_data = JSON.parse(raw_data);
        // console.log(json_data)
        // pm.expect(pm.response.json().updated_data.uname).to.be.eql(json_data.uname);
        // pm.expect(pm.response.json().updated_data.message).to.be.eql(json_data.message);
        chreq.put(`/update:${params_id}`).send(data).end((err, res)=>{
            res.expect(res.json().updated_data.uname).to.be.eql(data.uname);
            res.expect(res.json().updated_data.message).to.be.eql(data.message);
        })
    })
})

describe('DELETE USER tests=>', ()=>{
    const params_id = "01GQG4JPCN7AX67ZYR4C4YQX32";

    it("Successful DELETE status code ", ()=>{
        chreq.delete(`/deleteUser:${params_id}`).end((err, res)=>{
            res.expect(res.code).to.be.eql(200);
        })
    })
    
    it("successfully deleted from database", ()=>{
        chreq.delete(`/deleteUser:${params_id}`).end((err, res)=>{
            res.expect(res.json().status).to.be.eql("DELETED");
        })
    })
})
