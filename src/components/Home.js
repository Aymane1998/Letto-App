import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Component } from 'react';
import moment from 'moment'
function Home() {

    const [event, setEvent] = useState();
    const [participants, setParticipants] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tickets, setTickets] = useState(1);


    useEffect(() => {
        axios.get('http://localhost:8080/event').then(response => {
            setEvent(response.data);

        })

        axios.get('http://localhost:8080/bookings').then(rsp => {
            setParticipants(rsp.data);
        })
    }, [])

    const handleSubmit = (e) => {

        const id = Math.floor(Math.random() * 20);
        let participant = {
            id: id,
            numberOfTickets: tickets,
            user: {
                firstName: firstName,
                lastName: lastName,
                avatar: {}
            }
        }
        axios.post('http://localhost:8080/bookings/', participant)
        setParticipants([...participants, participant]); // pour ajouter dans la liste des participants
        setSubmited(true); // si on a reservé ou pas !!
        setDisplayForm(false); // desactiver le formulaire
    }

    if (!event) {
        return <>Event no trouvé</>
    }

    return (
        <div className="container">
            <div className="reservation">
                <div className="btns">
                    { !displayForm && submited == false &&
                        <>
                            <div className="gratuit">Gratuit</div>
                            <button className="reserver" onClick={e => setDisplayForm(true)}>Réserver</button>
                        </>
                    }
                    {!displayForm && submited== true && <div className="gratuit"> 🎉 J'y vais {tickets} place reservé</div> }
                    {!displayForm && submited== true && <button type="button" class="btn btn-outline-danger">Modifier ma réservation</button> }



                    {displayForm &&
                        <div>
                            <input  className="mb-2" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <input  className="mb-2" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                            <input  className="mb-2" className="form-control" value={tickets} onChange={e => setTickets(Number(e.target.value))} type="number" name="place" />
                            <button className="reserver" onClick={handleSubmit} >Réserver</button>
                        </div>
                    }


                </div>
                <p className="info"><span className="first">Politiquue de remboursement</span>
                  Les annulations et remboursements peuvent s’effectuer jusqu’à la date de clôture des inscriptions soit jusqu’au 25 janvier 2021</p>
            </div>

            <div className="left">
                <div className="global">
                    <img src={event.image.url} className="image" alt="" />
                    <div className="date">
                        <div className="mois">{moment(event.startAt).format('MMM')}</div>
                        <div className="chiffre">{moment(event.startAt).format('DD')}</div>
                    </div>
                    <h3>{event.title}</h3>
                    <div className="heure"><h2>{moment(event.startAt).format('HH:mm')} - {moment(event.endAt).format('HH:mm')}</h2></div>
                    <div className="place-date">
                        <div className="place">
                            <h2>Place restantes</h2>
                            <p>{event.remainingTickets}</p>
                        </div>
                        <div className="date1">
                            <h2>Date de cloture</h2>
                            <p>{moment(event.endAt).format('L')}</p>
                        </div>
                    </div>
                    <p className="infos">{event.description}</p>
                </div>
                <div className="participants">
                    <h2>Liste des participants {participants.length}</h2>
                </div>
                <div className="salaries">

                    <div className="list-head">
                        <div className="list-head-left">Salarié</div>
                        <div className="list-head-right">Quantité réservée</div>
                    </div>
                    <div className="salaries-list">
                        {participants?.length > 0 && participants.map(participant => {
                            return (
                                <div key={participant.id} className="participant">
                                    <div className="participant-user">
                                        <img className="img" src={participant.user.avatar?.url || "/avatar.png"} alt="" />
                                        <h3 className="name">{participant.user.firstName + " " + participant.user.lastName}</h3>
                                    </div>
                                    <div className="num">{participant.numberOfTickets}</div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>




















        </div>
    )
}

export default Home

/*<div>
           <p>Hello Aymane , Welcomme Back</p>
           <button className="btn btn-success"><Link to="/Login">Réserver !</Link></button>
        </div>*/