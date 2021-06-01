import React from 'react';
import { navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const FeaturedImagelink = ({ item }) => {
  //console.log("FeaturedImagelink item", item)

  // Use the primary image, the first of the images set
  const image = (item && item.image) ? getImage(item.image.localFile.childImageSharp.gatsbyImageData) : getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  const isTradingcard = (item.project_2020_player || item.topps_1951_player || item.project_70_player)

  const isProduct = item.product_category

  const menu = (isTradingcard ? 'topps' : (isProduct ? 'product' : (item.qty > 0 ? 'gallery' : 'portfolio')))

  let toppsSeries = ""
  let player = ""
  if (item.project_2020_player) {
    toppsSeries = "project2020"
    player = item.project_2020_player.name
  }
  if (item.topps_1951_player) {
    toppsSeries = "1951"
    player = item.topps_1951_player.name
  }
  if (item.project_70_player) {
    toppsSeries = "project70"
    player = item.project_70_player.name
  }

  const submenu = (isProduct ? item.product_category : (toppsSeries.length > 0 ? toppsSeries : item.subgenre.slug))

  const link = `/${menu}/${submenu}/`

  const handleKeyDown = (event) => {
    if (event.keycode === 13) handleClick();
  }
  const handleClick = () => {
    if (isProduct) {
      navigate(link)
    }
    if (!isTradingcard && !item.sport) {
      // Non-sport painting
      navigate(link)
    }
    if (item.sport) {
      // Sport/Athlete painting
      navigate(link, { state: { sport: item.sport.name } })
    }
    if (isTradingcard) {
      navigate(link, { state: { player: player } })
    }
  }

  return (
    <div className="img-hover-zoom">
      <div role="button" tabIndex="0" onClick={() => handleClick()} onKeyDown={(event) => handleKeyDown(event)}>
        <GatsbyImage className="img-fluid rounded" image={image} alt={item.title} />
      </div>
    </div>
  )
}

export default FeaturedImagelink;
