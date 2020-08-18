import React, { useContext, useEffect, useState } from "react"

import { MDBCard, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const ContactPage = () => {

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  // Get token for sending secure email as soon as the component loads
  const [secureToken, setSecureToken] = useState('')
  useEffect(() => {
    const getSecureToken = async () => {
      try {
        const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "identifier": `${process.env.GATSBY_EMAIL_AGENT_IDENTIFIER}`,
            "password": `${process.env.GATSBY_EMAIL_AGENT_PASSWORD}`
          })
        })
        const data = await response.json()
        //console.log('contact useEffect data', data)
        setSecureToken(data.jwt)
      } catch (err) {
        console.log('contact useEffect err', err)
      }
    }
    getSecureToken()
  }, [])

  const handleSubmit = async event => {
    console.log("Click!")
    event.preventDefault()
    event.target.className += " was-validated"
/*
    const sendEmail = async () => {
      try {
        const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            "identifier": `${process.env.GATSBY_EMAIL_AGENT_IDENTIFIER}`,
            "password": `${process.env.GATSBY_EMAIL_AGENT_PASSWORD}`
          })
        })
        const data = await response.json()
        //console.log('contact useEffect data', data)
        setSecureToken(data.jwt)
      } catch (err) {
        console.log('contact useEffect err', err)
      }
    }
    sendEmail()

    await strapi.plugins['email'].services.email.send({
      to: `patrick@iartx.com`,
      from: `patrick@ibookx.com`,
      subject: `Contact Email Test`,
      text: `Here's a bit of text....`
    })
*/    
  }

  return (
  <Layout>
    <SEO title="Contact Us" />
    <MDBContainer className="page-container contact">
      <h1 className="page-head">Contact Us</h1>

      <MDBCard className="banner">
        <h2 className="text-center w-responsive mx-auto pt-3">
          Thoughts? Comment? Suggestion? Request?
        </h2>
        <h3 className="text-center w-responsive mx-auto pb-3">
          Don't keep it to yourself. We'd love to hear from you!
        </h3>
      </MDBCard>

      <MDBRow>
        <MDBCol md="8" className="md-0 mb-5">
          <MDBCard>
          <form onSubmit={(e) => handleSubmit(e)}>
            <MDBRow>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="contact-name" label="Your name" value={fullname} className="mt-4" required onChange={(event) => setFullname(event.target.value)} />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="email" id="contact-email" label="Your email" value={email} className="mt-4" required onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="contact-subject" label="Subject" value={subject} className="mt-4" required onChange={(event) => setSubject(event.target.value)} />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBInput type="textarea" id="contact-message" label="Your message" value={message} className="mt-4" required onChange={(event) => setMessage(event.target.value)}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <div className="text-center">
              <MDBBtn type="submit" id="submit" color="primary">Send</MDBBtn>
            </div>
          </form>

          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="text-center">
          <MDBCard>
          <ul className="list-unstyled mb-0">
            <li>
              <div className="btn-floating">
                <MDBIcon icon="map-marker-alt" />
              </div>
              <p className="contact-info">Long Island City, NY 11101, USA</p>
            </li>
            <li>
              <div className="btn-floating">
                <MDBIcon icon="phone" />
              </div>
              <p className="contact-info">+ 01 234 567 89</p>
            </li>
            <li>
              <div className="btn-floating">
                <MDBIcon icon="envelope" />
              </div>
              <p className="contact-info">contact@blake.art</p>
            </li>
          </ul>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  </Layout>
)
}

export default ContactPage
