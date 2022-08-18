const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/db.config');
const jwt = require('jsonwebtoken')


// creating jwt
const createToken = (id) => {
    let maxAge = 60 * 60 * 24 * 2;
    return jwt.sign({
        id
    }, 'basit', {
        expiresIn: maxAge
    });
};

const getElection = (id) => {
    // check if election is still live 
        const getElection = `SELECT * FROM ELECTION WHERE ELECTIONID = '${id}'`;
        let e = connection.query(getElection, (err, response) => {
            if (err) throw new err;
            var election = response
            return election
        })
        // console.log(election)
        return e

}
// get polls
router.get('/getpoll/:id', (req, res) => {
    const id = req.body.id;
    console.log(id)
    const q = `select poll_vote.voted_for from poll_vote where voter_id = '${id}'`;
    connection.query(q, (err, response) => {
        if (err) throw err;
        console.log(response)
        let some = JSON.parse(response[0])
        console.log(some);
        res.send(response[0])
    })
})


router.post('/signinVoter', (req, res) => {
    console.log(req.body)

    const {
        userid,
        passcode
    } = req.body;
    try {

        if (userid && passcode) {



        

            const getUserId = `SELECT * FROM VOTERS WHERE voterId = '${userid}'`;
            connection.query(getUserId, async (err, response) => {
                if (err) throw err;
                // check if user exist
                if (response.length > 0) {
                    const voter_data = response[0]
                    let dbPass = voter_data.passwordHash

                    // check if user has already voted
                    if (voter_data.vote_status == 0) {

                        let compare = await bcrypt.compare(passcode, dbPass);
                        if (compare) {
                            console.log('logged in', compare)
                            //create cookie
                            const _id = voter_data.id;
                            console.log(_id)
                            const token = createToken(_id);
                            res.cookie('jwt', token, {
                                httpOnly: true,
                                maxAge: 3 * 60 * 60 * 1000
                            });
                            console.log('id',voter_data.electionId)
                            // check if election is still live
                            const getElection = `SELECT Status FROM ELECTION WHERE ELECTIONID = '${voter_data.electionId}'`;
                            connection.query(getElection, (err, response) => {
                                if (err) throw new err;
                                var election = response[0]
                                console.log(election)
                                if (election.Status == 1) {
                                   res.status(200).send({
                                    Status: true,
                                    msg: 'logged in',
                                    token,
                                    voterData: {
                                        voterid: voter_data.voterId,
                                        electionid: voter_data.electionId
                                    }
                                })  
                                }
                                else if (election.Status == 2){
                                    res.send({msg:'election is finished'})
                                }
                                else if (election.Status == 0) {
                                    res.send({ msg: 'election paused' })
                                }

                               

                            })

                         
                        } else {
                            // console.log('passcode does not match');
                            res.send({
                                loginStatus: false,
                                msg: 'incorrect password'
                            });

                        }
                    } else {
                        res.status('200').send({
                            loginStatus: false,
                            msg: 'voter has already voted'
                        })
                    }
                }

                else {
                    res.send({ msg: 'user does not exist' })
                }

            })

        }
        else {
            res.send({ msg: 'fields cant be empty' })
        }

    } catch (error) {
        res.send('error')

    }


})

//display the voting screen to voter
router.get('/votingPage/:electionid/:voterid', (req, res) => {
    console.log(req.params)
    let {
        electionid,
        voterid
    } = req.params;
    //  electionid = 'gsoctcm'
    // get election name
    const getElection = `SELECT * FROM ELECTION WHERE ELECTIONID = '${electionid}'`;
    connection.query(getElection, (err, response) => {
        if (err) throw err;
        let getElectionData = response
        console.log(getElectionData)
        //get candidate from this election
        const getCandidate = `SELECT * FROM CANDIDATE WHERE ELECTIONID = '${electionid}' ORDER BY PRIORITY`;
        connection.query(getCandidate, (err, response) => {
            if (err) throw err;
            let getCandidate = response;
            const getVoter = `SELECT * FROM VOTERS WHERE VOTERID = '${voterid}'`
            connection.query(getVoter, (err, response) => {
                if (err) throw err;
                let getVoter = response;
                res.status('200').send({ getElectionData, getCandidate, getVoter })


            })

        })
    })

})

router.post('/voted', (req, res) => {
    console.log('body', req.body)


    let {
        pollId,
        voterId,
        electionId,
        votedFor
    } = req.body
    votedFor = JSON.stringify([votedFor])
    console.log(votedFor)
    const votedQuery = `INSERT INTO poll_vote(poll_id, voter_id, voted_for, content,ElectionId) 
     VALUES ('${pollId}','${voterId}','${votedFor}', 'dsfsfdf','${electionId}')`;
    connection.query(votedQuery, (err, response) => {
        if (err) throw err;
        //set voted to true
        const setVoted = `UPDATE voters SET vote_status = '1' WHERE voters.voterid = '${voterId}'`;
        connection.query(setVoted, (err, response) => {
            if (err) throw err;
            res.status('200').send('success')

        })
    })

})


module.exports = router;


//create useful content put it up free for the internet