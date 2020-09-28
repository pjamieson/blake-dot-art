import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBDataTableV5, MDBInput } from "mdbreact"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
//import CardTopps2020 from "../../components/card-topps2020"

import { formatPrice } from "../../utils/format"

const OrdersReportPage = ({ data }) => {
  const {
    allStrapiOrder: { nodes: orders },
    allStrapiTradingcard: { nodes: cards }
  } = data

  orders.forEach(order => {
    order.subtotal = formatPrice(order.subtotal)
    order.salestax = formatPrice(order.salestax)
    order.shipping = formatPrice(order.shipping)
    order.total = formatPrice(order.total)
  })

  // Flatten query result by ignoring other cards in order
  let card_orders = []
  cards.forEach(card => {
    const card_identifier = card.identifier
    const card_title = card.title
    const card_subtitle = card.subtitle
    const card_price = formatPrice(card.price)
    const orders = card.orders
    orders.forEach((card_order) => {
      const order_id = card_order.id
      const created_at = card_order.created_at
      const lastname = card_order.lastname
      const firstname = card_order.firstname
      const state = card_order.state
      const items = card_order.items
      items.forEach((item) => {
        if (item.identifier === card_identifier) {
          card_orders.push(
            {
              id: order_id,
              created_at: created_at,
              identifier: card_identifier,
              title: card_title,
              subtitle: card_subtitle,
              price: card_price,
              qty: item.qty,
              lastname,
              firstname,
              state
            }
          )
        }
      })
    })
  })

  const datatable = {
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
      {
        label: 'Item',
        field: 'title',
        width: 120,
      },
    ],
    rows: orders,
  }

  const datatable2 = {
    columns: [
      {
        label: 'Order',
        field: 'id',
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
        label: 'Card Identifier',
        field: 'identifier',
        width: 160,
      },
      {
        label: 'Title',
        field: 'title',
        width: 160,
      },
      {
        label: 'Subtitle',
        field: 'subtitle',
        sort: 'disabled',
        width: 160,
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'disabled',
        width: 100,
        className: 'text-right',
      },
      {
        label: 'Qty',
        field: 'qty',
        sort: 'disabled',
        width: 80,
      },
      {
        label: 'Last Name',
        field: 'lastname',
        width: 160,
      },
      {
        label: 'First Name',
        field: 'firstname',
        width: 160,
      },
      {
        label: 'State',
        field: 'state',
        width: 120,
      },
    ],
    rows: card_orders,
  }

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
              <h2>Orders Summary List</h2>
              <MDBDataTableV5 hover scrollX data={datatable} exportToCSV proSelect />
            </article>
          </section>
          <section className="items-report">
            <article className="content-container">
            <h2>Items by Order List</h2>
              <MDBDataTableV5 hover scrollX data={datatable2} exportToCSV proSelect />
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
    allStrapiOrder(
      sort: {fields: id, order: DESC},
      filter: {total: {gt: 0}}
    ) {
      nodes {
        id
        created_at(formatString: "YYYY-MM-DD HH:MM:SS")
        lastname
        state
        zip
        subtotal
        salestax
        shipping
        total
        strapiId
        card_qty {
          qty
          item_type
          identifier
          title
        }
      }
    }
    allStrapiTradingcard(
      sort: {fields: identifier},
      filter: {orders: {elemMatch: {total: {gt: 0}}}}
    ) {
      nodes {
        identifier
        title
        subtitle
        price
        orders {
          id
          created_at(formatString: "YYYY-MM-DD HH:MM:SS")
          total
          items: card_qty {
            qty
            identifier
          }
          firstname
          lastname
          address
          address2
          city
          state
          zip
          country
          email
        }
      }
    }
  }
`
/*
export const query2 = graphql`
  {
    allStrapiTradingcard(
      sort: {fields: identifier},
      filter: {orders: {elemMatch: {total: {gt: 0}}}}
    ) {
      nodes {
        identifier
        title
        subtitle
        price
        orders {
          created_at(formatString: "YYYY-MM-DD HH:MM:SS")
          total
          items: card_qty {
            qty
            identifier
          }
          firstname
          lastname
          address
          address2
          city
          state
          zip
          country
          email
        }
      }
    }
  }
`
*/
export default OrdersReportPage
