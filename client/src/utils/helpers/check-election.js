import axios from 'axios';
import { DateTime } from 'luxon'

// get election and check if status 
export const electionStatus = async (id) => {
    const response = await axios.get('http://localhost:3001/admin/admin-dashboard');
    const Data = response.data;
    let election = Data.filter(ele => ele.ElectionId === id)
    let data = election[0]
    return data
    // console.log(data.Start_time)

}

// display timer function
export const timeLeft = async (electionid) => {
    const data = await electionStatus(electionid)
    console.log(data)
    let start_date = DateTime.fromISO(`${data.Start_time}`).toISODate()
    let start_time = DateTime.fromISO(`${data.Start_time}`).toISOTime().split('.')[0]
    let stop_date = DateTime.fromISO(`${data.Stop_time}`).toISODate()
    let stop_time = DateTime.fromISO(`${data.Stop_time}`).toISOTime().split('.')[0]
    let timeNow = DateTime.now().toISOTime().split('.')[0]

    let first = DateTime.now();
    let second = DateTime.fromISO(`${data.Stop_time}`)
    let see = second.diff(first, ['hour', 'minute', 'second']).toObject()
    let counter = second.diff(first, [ 'second']).toObject().seconds
    let showTimer = `${see.hours}:${see.minutes}:${see.seconds.toString().split('.')[0]}`
    return ({showTimer,counter})

}

// let counter = 0
// let timer = setInterval(async () => {
//     startElection()
//     counter++
//     console.log(counter)
//     if (counter === 180) {
//         clearInterval(timer)
//     }
// }, 1000);

// start an election and end an election
export const startElection = async () => {
    const data = await electionStatus()
    // console.log(data)
    // start_date, start_time, stop_date, stop_time 

    let start_date = DateTime.fromISO(`${data.Start_time}`).toISODate()
    let start_time = DateTime.fromISO(`${data.Start_time}`).toISOTime().split('.')[0]
    let stop_date = DateTime.fromISO(`${data.Stop_time}`).toISODate()
    let stop_time = DateTime.fromISO(`${data.Stop_time}`).toISOTime().split('.')[0]


    let timeNow = DateTime.now().toISOTime().split('.')[0]
    let dateNow = DateTime.now().toISODate()

    //console.log( 'start',start_date, start_time,'stop', stop_date, stop_time,'now',dateNow,timeNow )

    // start election 
    if (start_date === dateNow && timeNow >= start_time) {
        console.log(`start time ${start_time} time now ${timeNow} started`)
    }
    // stop election 
    if (stop_date === dateNow && timeNow >= stop_time) {
        // clearInterval(timer)
        // set election to finished if stop time elapses 
        axios.put('http://localhost:3001/admin/checkStoppage')
        return (`start time ${start_time} ${timeNow} election ended`)

    }
}

