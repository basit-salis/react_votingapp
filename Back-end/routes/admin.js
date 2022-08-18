const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const connection = require('../config/db.config');
const {DateTime}= require("luxon");

//election result
router.get('/election-result/:id', (req, res) => {
    electionid = req.params.id
    let candidates = `SELECT CANDIDATE.CANDIDATE_NAME,CANDIDATE.ID, CANDIDATE.POSITION FROM CANDIDATE WHERE ELECTIONID = '${electionid}' ORDER BY position`
    connection.query(candidates, (err, response) => {
        if (err) throw err;
        let candidates = response
       const getPolls = `SELECT voted_for FROM POLL_VOTE WHERE ELECTIONID = '${electionid}'`;
       connection.query(getPolls,(err,response)=>{
        if (err) throw err;
        let polls = response
        console.log('polls',polls)

        candidates.map((candidate,i)=>{
            candidate.vote_count = 0
            polls.map((poll,j)=>{
                poll = JSON.parse(poll.voted_for)[0]
                console.log('poll',poll)
                console.log(poll[candidate.POSITION])
               
               
                poll[candidate.POSITION]  == candidate.ID ? candidate.vote_count++ : null
            })
        })
        //    let eg = polls[2].voted_for
        //    console.log(JSON.parse(eg))
           res.send(candidates)

       })

    })
    // console.log(electionid)
})

// election status checker
router.put('/checkStoppage',(req, res) => {

    const stopElection = `UPDATE election SET Status  = '2' WHERE electionid = "gsoctcm"`;
    // get election 
    // const election = `SELECT * FROM ELECTION WHERE ELECTIONID = 'gsoctcm'`;
    connection.query(stopElection, (err, response) => {
        if (err) throw err
        res.send(response)

    })
})

// load dashboard data from db
router.get('/admin-dashboard', (req, res) => {

    const getElection = `SELECT * FROM ELECTION`;
    connection.query(getElection, (err, response) => {
        if (err) throw err
        let electionData = response
        if (electionData.length == 0){
            res.send(electionData)
        }
        let DATA = []
        electionData.map((data, i, arr) => {
            getVoters = `SELECT VOTE_STATUS FROM VOTERS WHERE ELECTIONID = '${data.ElectionId}'`;
            connection.query(getVoters, (err, response) => {
                if (err) throw err;
                if (response.length == 0) {
                    data["totalVoters"] = 0;
                    data["voted"] = 0
                    DATA.push(data)
                    arr.length - 1 == i ? res.send(DATA) : null;

                }
                else {
                    // console.log('respo', response);
                    let totalVoters = response.length;
                    var voted = 0;
                    let voter = response.map(resp => {
                        // check if voter has voted
                        if (resp.VOTE_STATUS == 1) {
                            voted++
                        }
                        return ({ totalVoters, voted })

                    });
                    // console.log(voter)
                    let voterData = voter.pop()
                    data["totalVoters"] = totalVoters
                    data["voted"] = voterData.voted
                    // console.log('here', data)
                    DATA.push(data)
                    arr.length - 1 == i ? res.send(DATA) : null;
                }

            })

        })

    })

})

//start pause election
router.put('/start-election/:status/:id',(req,res)=>{
    const { id, status } = req.params

    //start election function
   const startElection = ()=>{
       let startQuery = `UPDATE election SET Status= '1' WHERE ElectionId = '${id}'`;
       connection.query(startQuery,(err,response)=>{
        if (err) throw err;
           console.log(response)

        res.send('1')
       })

    }

    //pause election function
    const pauseElection = () => {
        let pauseQuery = `UPDATE election SET Status= '0' WHERE ElectionId = '${id}'`;
        connection.query(pauseQuery, (err, response) => {
            if (err) throw err;
            console.log(response)
            res.send('0')
        })

    }
    //stop election function
    const stopElection = () => {
        let stopQuery = `UPDATE election SET Status= '2' WHERE ElectionId = '${id}'`;
        connection.query(stopQuery, (err, response) => {
            if (err) throw err;
            res.send('election stopped')
        })

    }
    status == 0 ? startElection() : status == 1 ? pauseElection() : stopElection();

})

// ======election Api's======
// create election
router.post('/createElection', (req, res) => {
    console.log(req.body)

    const Electionid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    const { title, description, organisation, startDate, startTime, endDate, endTime, candidate } = req.body
    let start = startDate + " " + startTime
    let end = endDate + " " + endTime
        const createElection = `INSERT INTO election(ElectionId, ELECTION_NAME, Organisers, Election_desc, Start_time, Stop_time,Status)
     VALUES ('${Electionid}','${title}','${organisation}','${description}','${start}','${end}','0')`
        connection.query(createElection, (err, response) => {
            if (err) throw err;
            // create candidate
            candidate.map(can => {
                let createCandidate = `INSERT INTO Candidate(ElectionId,candidate_name,position) VALUES ('${Electionid}','${can.candidateName}','${can.candidatePosition}')`
                connection.query(createCandidate, (err, response) => {
                    if (err) throw err;
                    console.log('res',response)

                    res.send({ "status": true, "Msg": 'election created' })
                })
            })


        })


})

// delete election
router.delete('/delElection/:id', (req, res) => {
    const id = req.params.id;
    const delElection = `DELETE FROM ELECTION WHERE ELECTIONID = '${id}'`
    connection.query(delElection, (err, response) => {
        if (err) throw err;
        if (response.affectedRows < 1) {
            res.send(`election with id:${id} cannot be found`);

        } else {
            console.log(response)
            res.send(`election id:${id} has been deleted`);

        }

    })
})

// update election
router.patch('/updateElection/:id', (req, res) => {
    const electionId = req.params.id;
    const {
        poll_name,
        start_time,
        stop_time,
        createdAt
    } = req.body;

    const updateElection = `UPDATE election SET Electiion_name='${poll_name}',Start_time='${start_time}',Stop_time='${stop_time}',ElectionCreatedAt='${createdAt}' WHERE 1`;
    connection.query(updateElection, (err, response) => {
        if (err) throw err

        res.status('200').send(`election ${poll_name} has been updated`);
    })

})


// ======voters Api's======
// get voters
router.get('/getVoters/:id', (req, res) => {
    const electionId = req.params.id
    const getVoters = `SELECT * FROM VOTERS WHERE ELECTIONID = '${electionId}'`;
    console.log(getVoters)
    connection.query(getVoters, (err, response) => {
        if (err) throw err
        let data = response
        console.log("this", data)
        res.status('200').send(data)

    })
})

// add voter
router.post('/addVoter', async (req, res) => {
    console.log(req.body)
    const {
        voterid,
        email,
        number,
        electionid,
    } = req.body;
    let addedAt = '2022-06-18 03:40:11.674009'
    let passcode = '12345'
    const hashedPassword = await bcrypt.hash(passcode, 10);

    // add user to an election
    const addVoter = `INSERT INTO voters(voterId, passwordHash, registeredAt, mobile, email, electionId,vote_status)
     VALUES('${voterid}','${hashedPassword}','${addedAt}','${number}','${email}','${electionid}','0')`
    connection.query(addVoter, (err, response) => {
        if (err) throw err;
        res.status('200').send(`voter ${voterid} added`);
    })

})
// remove voter
router.delete('/delVoter/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const delVoter = `DELETE FROM VOTERS WHERE ID = '${id}'`
    console.log(delVoter)
    connection.query(delVoter, (err, response) => {
        if (err) throw err;
        res.send(`voter with id ${id} has been removed`);

    })
})
// update voter
router.patch('/editVoter/:id', (req, res) => {
    const {
        voterid, email, number, id
    } = req.body;
    const updateVoter = `UPDATE voters SET voterId='${voterid}',mobile='${number}',email='${email}' WHERE id = ${id}`;
    console.log(updateVoter)
    connection.query(updateVoter, (err, response) => {
        if (err) throw err
        if (response.affectedRows < 1) {
            res.send(`voter with id:${id} cannot be found`);

        } else {
            console.log(response)
            res.status('200').send(`voter  with id ${id} has been updated`);
        }

    })
})

//======== contestant apis=======
// get candidate
router.get('/getCandidate/:id', (req, res) => {
    const electionId = req.params.id
    const getCandidate = `SELECT * FROM CANDIDATE WHERE ELECTIONID = '${electionId}'`;
    console.log(getCandidate)
    connection.query(getCandidate, (err, response) => {
        if (err) throw err
        let data = response
        // console.log(data)
        res.status('200').send(data)
    })
})
//add contestant
router.post('/createContestant', (req, res) => {
    console.log(req.body)

    const {
        candidate_name, position, title, email, number, electionid

    } = req.body;
    // check if electionid exist in election table
    const getElections = `SELECT ELECTIONID FROM ELECTION WHERE ELECTIONID = '${electionid}'`;
    connection.query(getElections, (err, response) => {
        if (err) res.send("err");

        // create candidate
        const createCandidate = `INSERT INTO Candidate(ElectionId,candidate_name,position) VALUES ('${electionid}','${candidate_name}','${position}')`
        connection.query(createCandidate, (err, response) => {
            if (err) throw err;
            res.status('200').send('user inserted');
        })
    })

})

//remove contestant
router.delete('/delContestant/:id', (req, res) => {
    const id = req.params.id;
    const delCandidate = `DELETE FROM CANDIDATE WHERE ID = '${id}'`
    connection.query(delCandidate, (err, response) => {
        if (err) throw err;
        res.send(`candidate with id ${id} has been removed`);

    })
})

//update contestant
router.patch('/updateCandidate/:id', (req, res) => {
    console.log(req.body)
    const { candidate_name, position, title, email, number, electionid, id } = req.body

    const updateCan = `UPDATE candidate SET candidate_name='${candidate_name}',position='${position}',priority='1' WHERE id = '${id}' AND ElectionId='${electionid}'`;
    connection.query(updateCan, (err, response) => {
        if (err) throw err

        console.log(response)
        res.status('200').send(`candidate  with id ${id} has been updated`);


    })
})


router.get('*',(req,res)=>{
    res.status('404').send('page not found')
})
module.exports = router;