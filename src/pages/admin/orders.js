import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBCard, MDBCardBody, MDBCollapse, MDBContainer, MDBDatatable, MDBIcon, MDBInput } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { formatPrice } from "../../utils/format"

const OrdersReportPage = ({ data }) => {
  const {
    allStrapiOrder: { nodes: orders },
    allStrapiTradingcard: { nodes: cards },
    allStrapiPainting: { nodes: paintings }
  } = data

  orders.forEach(order => {
    order.subtotal = formatPrice(order.subtotal)
    order.salestax = formatPrice(order.salestax)
    order.shipping = formatPrice(order.shipping)
    order.total = formatPrice(order.total)
  })

  let item_orders = []

  // Flatten query result by ignoring other items in order
  cards.forEach(card => {
    flattenItem(card)
  })

  // Do same for paintings.
  paintings.forEach(painting => {
    flattenItem(painting)
  })

  function flattenItem(item) {
    const item_identifier = item.identifier
    const item_title = item.title
    const item_subtitle = item.subtitle
    const item_price = formatPrice(item.price)
    const orders = item.orders
    orders.forEach((item_order) => {
      const order_id = item_order.id
      const created_at = item_order.created_at
      const name = `${item_order.firstname} ${item_order.lastname}`
//      const temp = item_order.address2 ? `${item_order.address} | ${item_order.address2}` : `${item_order.address}`
//      const address = `${temp} | ${item_order.city} | ${item_order.state} ${item_order.zip} ${item_order.country}`
      const email = item_order.email
      const items = item_order.items
      items.forEach((item) => {
        if (item.identifier === item_identifier) {
          item_orders.push(
            {
              identifier: item_identifier,
              title: item_title,
              subtitle: item_subtitle,
              price: item_price,
              qty: item.qty,
              id: order_id,
              created_at: created_at,
              name,
//              address,
              email
            }
          )
        }
      })
    })
  }

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
    ],
    rows: orders,
  }

  const datatable2 = {
    columns: [
      {
        label: 'Item Identifier',
        field: 'identifier',
        width: 160,
        sort: 'asc',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Item Identifier',
        },
      },
      {
        label: 'Title',
        field: 'title',
        width: 200,
      },
      {
        label: 'Subtitle',
        field: 'subtitle',
        sort: 'disabled',
        width: 200,
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
        width: 60,
      },
      {
        label: 'Order',
        field: 'id',
        width: 80,
      },
      {
        label: 'Order Date',
        field: 'created_at',
        width: 140,
      },
      {
        label: 'Name',
        field: 'name',
        width: 200,
      },
/*      {
        label: 'Address',
        field: 'address',
        width: 220,
      },
*/      {
        label: 'Email',
        field: 'email',
        width: 260,
      },
    ],
    rows: item_orders,
  }

  const pagePassword = "sayheykid"

  const [enteredPassword, setEnteredPassword] = useState('')
  const [pageProtected, setPageProtected] = useState(true)

  const [showFirstElement, setShowFirstElement] = useState(false);
  const [showSecondElement, setShowSecondElement] = useState(false);

  const toggleFirstElement = () => setShowFirstElement(!showFirstElement);
  const toggleSecondElement = () => setShowSecondElement(!showSecondElement);

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
      <Seo title="Admin - Orders" />
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
          <hr />
          <MDBContainer className="md-accordion mt-3">

            <MDBCard className="mt-3">
              <MDBBtn className="collapse-header" tagClassName="d-flex justify-content-between" onClick={toggleFirstElement}>
                <h2>Orders Summary List</h2>
                <MDBIcon icon={showFirstElement ? 'angle-up' : 'angle-down'} />
              </MDBBtn>
              <MDBCollapse show={showFirstElement}>
                <MDBCardBody>
                  <section className="orders-report">
                    <article className="content-container">
                      <MDBDatatable advancedData hover data={datatable} search />
                    </article>
                  </section>
                </MDBCardBody>
              </MDBCollapse>
            </MDBCard>

            <MDBCard className="mt-3">
              <MDBBtn className="collapse-header" tagClassName="d-flex justify-content-between" onClick={toggleSecondElement}>
                <h2>Items by Order List</h2>
                <MDBIcon icon={showSecondElement ? 'angle-up' : 'angle-down'} />
              </MDBBtn>
              <MDBCollapse show={showSecondElement}>
                <MDBCardBody>
                  <section className="items-report">
                    <article className="content-container">
                      <MDBDatatable advancedData hover data={datatable2} search />
                    </article>
                  </section>
                </MDBCardBody>
              </MDBCollapse>
            </MDBCard>
          </MDBContainer>
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
        strapiId
        created_at(formatString: "YYYY-MM-DD HH:MM:SS")
        lastname
        state
        zip
        subtotal
        salestax
        shipping
        total
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
    allStrapiPainting(
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

export default OrdersReportPage
