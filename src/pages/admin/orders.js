import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBDataTableV5, MDBInput } from "mdbreact"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CardTopps2020 from "../../components/card-topps2020"

import { formatPrice } from "../../utils/format"

const OrdersReportPage = ({ data }) => {
  const {
    allStrapiOrder: { nodes: orders }
  } = data

  orders.forEach(order => {
    order.subtotal = formatPrice(order.subtotal)
    order.salestax = formatPrice(order.salestax)
    order.shipping = formatPrice(order.shipping)
    order.total = formatPrice(order.total)
  })

  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'Order',
        field: 'strapiId',
        width: 80,
        sort: 'desc',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Order',
        },
      },
      {
        label: 'Order Date',
        field: 'created_at',
        width: 140,
      },
      {
        label: 'Last Name',
        field: 'lastname',
        width: 160,
      },
      {
        label: 'State',
        field: 'state',
        width: 80,
      },
      {
        label: 'Zip',
        field: 'zip',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Subtotal',
        field: 'subtotal',
        sort: 'disabled',
        width: 120,
        className: 'text-right',
      },
      {
        label: 'Sales Tax',
        field: 'salestax',
        sort: 'disabled',
        width: 120,
      },
      {
        label: 'Shipping',
        field: 'shipping',
        sort: 'disabled',
        width: 120,
      },
      {
        label: 'Total',
        field: 'total',
        sort: 'disabled',
        width: 120,
      },
    ],
    rows: orders,
  })

  const pagePassword = "sayheykid"

  const [enteredPassword, setEnteredPassword] = useState('')
  const [pageProtected, setPageProtected] = useState(true)

  const valid = () => {
    if (enteredPassword.length > 8) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.target.className += " was-validated"

    if (enteredPassword === pagePassword) {
      setPageProtected(false)
    } else {
      setEnteredPassword('')
    }
  }

  return (
    <Layout>
      <SEO title="Admin - Orders" />
      <div className="container page-container">
        { (pageProtected) &&
          <div className="card protected-card">
            <h5 className="card-header primary-color white-text text-center py-4">
              <strong>Password-Protected Page</strong>
            </h5>
            <div className="card-body px-lg-5 pt-0">
              <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
                <div className="md-form">
                  <MDBInput type="password" id="password" className="form-control" label="Password" value={enteredPassword} required onChange={(event) => setEnteredPassword(event.target.value)}/>
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" id="submit" color="primary" disabled={!valid()}>
                    Submit
                  </MDBBtn>
                </div>
              </form>
            </div>
          </div>
        }
        { (!pageProtected) &&
          <>
          <h1 className="page-head">Admin - Orders</h1>
          <section className="orders-report">
            <article className="content-container">
              <MDBDataTableV5 hover scrollX data={datatable} exportToCSV proSelect />
            </article>
          </section>
          </>
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiOrder(sort: {fields: id, order: DESC}) {
      nodes {
        strapiId
        created_at(formatString: "YYYY-MM-DD")
        lastname
        state
        zip
        subtotal
        salestax
        shipping
        total
      }
    }
  }
`

export default OrdersReportPage
