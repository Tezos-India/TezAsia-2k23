import React from 'react'

export default function Contact() {
    return (
        <section id="contact">
            <div className="contact-top">
                <h1>Contact <span>Us</span></h1>
            </div>
            <div className="contact">
                <div className="left">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214842.63467865065!2d74.69514789256243!3d32.714855304593875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84bf169d3525%3A0xf233488eeb8fd8d!2sJammu!5e0!3m2!1sen!2sin!4v1690918560109!5m2!1sen!2sin"
                        width="600" height="450" style={{border: + '0'}} allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="right">
                    <div className="emails">
                        <h1>Get in touch</h1>
                        <div className="email-box">
                            <p><a href="mailto:ayushthakur1412@gmail.com">ayushthakur1412@gmail.com</a></p>
                            <p><a href="mailto:eshasuri678@gmail.com">eshasuri678@gmail.com</a></p>
                            <p><a href="mailto:garimasaigal02@gmail.com">garimasaigal02@gmail.com</a></p>
                            <p><a href="mailto:jamwalmanav69@gmail.com">jamwalmanav69@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
