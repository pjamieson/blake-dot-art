import React, { useState } from "react"

import { MDBCard, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

import Layout from "../components/layout"
import SEO from "../components/seo"

import addToMailchimp from 'gatsby-plugin-mailchimp'

const SubscribePage = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const valid = () => {
    if (firstname.length > 1 && lastname.length > 3 && email.length > 10) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.target.className += " was-validated"

    const listFields = {
      FNAME: firstname,
      LNAME: lastname
    }

    const sub_result = await addToMailchimp(email, listFields)

    if (sub_result) {
      //console.log("subscribe sub_result", sub_result)
      const msg = sub_result.msg
      // Go to MessageSentPage
      if (sub_result.result === "success") {
        setMessage(msg)
      } else if (msg.includes("already subscribed")) {
        setMessage(`${email} is already subscribed.`)
      } else {
        setMessage(msg)
      }
    }
  }

  return (
    <Layout>
      <SEO title="Subscribe" />
      <MDBContainer className="page-container subscribe">
        <h1 className="page-head">Mailing List</h1>
        <MDBCard className="banner">
          <h2 className="text-center mx-auto pt-3">
            Subscribe to Blake's Mailing List
          </h2>
          <h3 className="text-center w-responsive mx-auto pb-3">
            Be among the first to receive news and special offers.
          </h3>
        </MDBCard>
        <MDBCard>
          <form onSubmit={(e) => handleSubmit(e)}>
            <MDBRow>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="firstname" label="First name*" value={firstname} className="mt-4" required onChange={(event) => setFirstname(event.target.value)} />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="lastname" label="Last name*" value={lastname} className="mt-4" required onChange={(event) => setLastname(event.target.value)}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBInput type="email" id="email" label="Your email*" value={email} className="mt-4" required onChange={(event) => setEmail(event.target.value)} />
                </div>
              </MDBCol>
            </MDBRow>
            <div className="text-center">
              { (message.length === 0) &&
                <MDBBtn type="submit" id="submit" color="primary" disabled={!valid()}>
                  Subscribe
                </MDBBtn>
              }
              { (message.length > 0) &&
                <p className="message">{message}</p>
              }
            </div>
          </form>
        </MDBCard>
      </MDBContainer>
    </Layout>
  )
}

export default SubscribePage;

/*
<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
	// Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	//  We recommend moving this block and the preceding CSS link to the HEAD of your HTML file.
</style>
<div id="mc_embed_signup">
<form action="https://blakejamieson.us5.list-manage.com/subscribe/post?u=063627aa25e9155fc458edccb&amp;id=d3c4f161f3" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<h2>Subscribe</h2>
<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
<div class="mc-field-group">
	<label for="mce-FNAME">First Name </label>
	<input type="text" value="" name="FNAME" class="" id="mce-FNAME">
</div>
<div class="mc-field-group">
	<label for="mce-LNAME">Last Name </label>
	<input type="text" value="" name="LNAME" class="" id="mce-LNAME">
</div>
	<div id="mce-responses" class="clear">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_063627aa25e9155fc458edccb_d3c4f161f3" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[15]='TEXTYUI_3';ftypes[15]='text';fnames[16]='TEXTAREAY';ftypes[16]='text';fnames[17]='ADDRESSYU';ftypes[17]='address';fnames[18]='TEXT4';ftypes[18]='text';fnames[19]='TEXT5';ftypes[19]='text';fnames[20]='TEXT1';ftypes[20]='text';fnames[21]='TEXT3';ftypes[21]='text';fnames[22]='TEXT6';ftypes[22]='text';fnames[23]='TEXT7';ftypes[23]='text';fnames[24]='TEXT8';ftypes[24]='text';fnames[25]='TEXT9';ftypes[25]='text';fnames[27]='NUMBERYUI';ftypes[27]='number';fnames[28]='CHECKBOXY';ftypes[28]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup-->
*/
